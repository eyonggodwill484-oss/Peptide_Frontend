import { Resend } from "resend";

let client: Resend | null = null;

/** Lazily-instantiated Resend client — server-only, never import from a Client Component. */
export function getResendClient(): Resend {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured.");
  }
  if (!client) {
    client = new Resend(process.env.RESEND_API_KEY);
  }
  return client;
}

/**
 * Sandbox address until a custom domain is verified in Resend. Once verified, set
 * RESEND_FROM_EMAIL (e.g. "Wardiere Peptide Sciences <orders@mail.wardierepeptidesciences.com>")
 * and this falls back to it automatically.
 */
export const EMAIL_FROM = process.env.RESEND_FROM_EMAIL || "Wardiere Peptide Sciences <onboarding@resend.dev>";
