import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendEmail } from '@/lib/email';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const { email, turnstileToken } = await request.json();

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json({ error: 'Email valide requis' }, { status: 400 });
    }

    // Turnstile verification
    if (turnstileToken) {
      const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY || '1x0000000000000000000000000000000AA',
          response: turnstileToken,
        }),
      });
      const verifyData = await verifyRes.json();
      if (!verifyData.success) {
        return NextResponse.json({ error: 'Vérification anti-spam échouée' }, { status: 400 });
      }
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existing = await prisma.newsletter.findUnique({ where: { email: normalizedEmail } });
    if (existing) return NextResponse.json({ message: 'Déjà inscrit' });

    await prisma.newsletter.create({ data: { email: normalizedEmail } });

    // Envoyer un email de bienvenue à l'abonné
    if (process.env.RESEND_API_KEY) {
      sendEmail({
        to: normalizedEmail,
        subject: 'Bienvenue à la newsletter Madaisy Consulting',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
            <h2 style="color: #2d6a4f;">Bienvenue chez Madaisy Consulting</h2>
            <p>Bonjour,</p>
            <p>Nous vous confirmons votre inscription à la newsletter de <strong>Madaisy Consulting</strong>.</p>
            <p>Vous recevrez désormais nos actualités, conseils et offres exclusives directement dans votre boîte mail.</p>
            <p style="margin-top: 20px;">À très bientôt,</p>
            <p><strong>L'équipe Madaisy Consulting</strong></p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
            <p style="color: #888; font-size: 12px;">
              Si vous souhaitez vous désinscrire, répondez simplement à cet email avec « Désinscription » en objet.
            </p>
          </div>
        `,
      }).catch((err) => console.error('Erreur envoi email newsletter:', err));
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
