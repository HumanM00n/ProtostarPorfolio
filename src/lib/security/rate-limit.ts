import "server-only";

/**
 * Rate limit à fenêtre fixe.
 *
 * - En production : compteurs partagés dans Upstash Redis (API REST, aucune dépendance).
 *   Variables : UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN.
 * - Sans Upstash (dev local) : compteurs en mémoire. Sur Vercel, chaque instance
 *   serverless a sa propre mémoire : ce repli ne suffit PAS en production.
 */

export type Rule = { id: string; limit: number; windowSeconds: number };

const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;
const useRedis = Boolean(url && token);

if (!useRedis && process.env.VERCEL_ENV === "production") {
  console.warn("[rate-limit] Upstash non configuré : repli en mémoire, insuffisant en production.");
}

const memory = new Map<string, { count: number; resetAt: number }>();

async function hitMemory(key: string, windowSeconds: number) {
  const now = Date.now();
  const entry = memory.get(key);
  if (!entry || entry.resetAt <= now) {
    memory.set(key, { count: 1, resetAt: now + windowSeconds * 1000 });
    return 1;
  }
  entry.count += 1;
  return entry.count;
}

async function hitRedis(key: string, windowSeconds: number) {
  // INCR puis EXPIRE NX (ne pose l'expiration qu'au premier hit de la fenêtre).
  const response = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify([
      ["INCR", key],
      ["EXPIRE", key, String(windowSeconds), "NX"],
    ]),
    cache: "no-store",
    signal: AbortSignal.timeout(3000),
  });
  if (!response.ok) throw new Error(`Upstash ${response.status}`);
  const [incr] = (await response.json()) as [{ result: number }];
  return incr.result;
}

/**
 * Incrémente chaque règle pour `subject` et indique si l'une d'elles est dépassée.
 * En cas de panne de Redis, on laisse passer (les autres protections restent actives).
 */
export async function rateLimit(subject: string, rules: Rule[]): Promise<{ allowed: boolean }> {
  try {
    for (const rule of rules) {
      const key = `rl:${rule.id}:${subject}`;
      const count = useRedis ? await hitRedis(key, rule.windowSeconds) : await hitMemory(key, rule.windowSeconds);
      if (count > rule.limit) return { allowed: false };
    }
    return { allowed: true };
  } catch (error) {
    console.error("[rate-limit] erreur, requête autorisée par défaut :", error);
    return { allowed: true };
  }
}
