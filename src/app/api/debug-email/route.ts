import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function GET() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return NextResponse.json({ resendKey: false, error: 'RESEND_API_KEY manquant' });

  try {
    const resend = new Resend(key);
    const result = await resend.emails.send({
      from: 'Madaisy Consulting <contact@madaisy-consulting.com>',
      to: 'bitechci.net@gmail.com',
      subject: 'Test debug Resend',
      html: '<p>Test envoi depuis endpoint debug</p>',
    });
    return NextResponse.json({ resendKey: true, sent: true, id: result.id });
  } catch (err: any) {
    return NextResponse.json({ resendKey: true, sent: false, error: err.message });
  }
}
