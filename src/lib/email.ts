import { Resend } from 'resend';

let _resend: Resend | null = null;

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) { console.error('[email] RESEND_API_KEY non trouvé'); return null; }
  if (!_resend) {
    _resend = new Resend(key);
    console.log('[email] Resend initialisé avec succès');
  }
  return _resend;
}

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const resend = getResend();
  if (!resend) { console.error('[email] Pas de client Resend'); return null; }

  try {
    const result = await resend.emails.send({
      from: 'Madaisy Consulting <contact@madaisy-consulting.com>',
      to,
      subject,
      html,
    });
    console.log('[email] Envoyé avec succès:', result);
    return result;
  } catch (err) {
    console.error('[email] Erreur envoi:', err);
    return null;
  }
}
