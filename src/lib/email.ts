import "server-only";

type Mail = { to: string; replyTo: string; subject: string; text: string };

/**
 * Envoie un e-mail texte via l'API Resend (https://resend.com).
 * Variables : RESEND_API_KEY, CONTACT_FROM_EMAIL (expéditeur sur un domaine vérifié chez Resend).
 * Sans clé en développement : l'e-mail est affiché dans la console au lieu d'être envoyé.
 */
export async function sendMail({ to, replyTo, subject, text }: Mail): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    if (process.env.NODE_ENV === "development") {
      console.info(`[email] (dev, non envoyé)\nÀ : ${to}\nRépondre à : ${replyTo}\nObjet : ${subject}\n\n${text}`);
      return true;
    }
    console.error("[email] RESEND_API_KEY absente : impossible d'envoyer le message.");
    return false;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "Site Protostar <onboarding@resend.dev>",
        to: [to],
        reply_to: replyTo,
        subject,
        text,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) {
      console.error("[email] Resend a refusé l'envoi :", response.status, await response.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error("[email] envoi impossible :", error);
    return false;
  }
}
