import "server-only";

/**
 * Vérifie le jeton Cloudflare Turnstile côté serveur.
 * Sans TURNSTILE_SECRET_KEY, la vérification est ignorée (dev local) :
 * le honeypot, le délai minimum et le rate limit restent actifs.
 */
export async function verifyTurnstile(token: string, ip: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    if (process.env.VERCEL_ENV === "production") {
      console.warn("[turnstile] TURNSTILE_SECRET_KEY absente : vérification anti-bot désactivée.");
    }
    return true;
  }
  if (!token) return false;

  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    const result = (await response.json()) as { success: boolean };
    return result.success === true;
  } catch (error) {
    console.error("[turnstile] vérification impossible :", error);
    return false;
  }
}
