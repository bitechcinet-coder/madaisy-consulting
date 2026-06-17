let _resend: any = null;

function getResend() {
  if (!_resend && process.env.RESEND_API_KEY) {
    const { Resend } = require('resend') as typeof import('resend');
    _resend = new Resend(process.env.RESEND_API_KEY);
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
  if (!resend) return null;
  return resend.emails.send({
    from: 'Madaisy Consulting <contact@madaisy-consulting.com>',
    to,
    subject,
    html,
  });
}
