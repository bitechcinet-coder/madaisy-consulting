import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { sendEmail } from '@/lib/email';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const take = parseInt(searchParams.get('take') || '20', 10);
  const skip = parseInt(searchParams.get('skip') || '0', 10);

  const contacts = await prisma.contact.findMany({
    orderBy: { createdAt: 'desc' },
    take,
    skip,
  });
  return NextResponse.json(contacts);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Turnstile verification
    if (body.turnstileToken) {
      const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY || '1x0000000000000000000000000000000AA',
          response: body.turnstileToken,
        }),
      });
      const verifyData = await verifyRes.json();
      if (!verifyData.success) {
        return NextResponse.json({ error: 'Vérification anti-spam échouée' }, { status: 400 });
      }
    }

    // Validation
    const { name, email, subject, message } = body;

    if (!name || typeof name !== 'string' || name.trim().length === 0 || name.length > 100) {
      return NextResponse.json({ error: 'Nom invalide (1-100 caractères)' }, { status: 400 });
    }

    if (!email || typeof email !== 'string' || email.trim().length === 0 || email.length > 255) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json({ error: 'Format d\'email invalide' }, { status: 400 });
    }

    if (!subject || typeof subject !== 'string' || subject.trim().length === 0 || subject.length > 200) {
      return NextResponse.json({ error: 'Sujet invalide (1-200 caractères)' }, { status: 400 });
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0 || message.length > 5000) {
      return NextResponse.json({ error: 'Message invalide (1-5000 caractères)' }, { status: 400 });
    }

    const contact = await prisma.contact.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
        phone: body.phone || null,
      },
    });

    // Envoyer une notification par email à l'équipe Madaisy
    if (process.env.RESEND_API_KEY) {
      sendEmail({
        to: 'contact@madaisy-consulting.com',
        subject: `Nouveau message de contact : ${subject.trim()}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
            <h2 style="color: #2d6a4f; border-bottom: 2px solid #2d6a4f; padding-bottom: 10px;">Nouveau message de contact</h2>
            <p><strong>Nom :</strong> ${name.trim()}</p>
            <p><strong>Email :</strong> ${email.trim()}</p>
            <p><strong>Téléphone :</strong> ${body.phone || 'Non renseigné'}</p>
            <p><strong>Sujet :</strong> ${subject.trim()}</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
            <h3 style="color: #555;">Message :</h3>
            <p style="white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-radius: 4px;">${message.trim()}</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
            <p style="color: #888; font-size: 12px;">Cet email a été envoyé automatiquement depuis le formulaire de contact de madaisy-consulting.com</p>
          </div>
        `,
      }).catch((err) => console.error('Erreur envoi email contact:', err));
    }

    return NextResponse.json(contact);
  } catch {
    return NextResponse.json({ error: 'Erreur' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  const { id, ...data } = await request.json();
  const contact = await prisma.contact.update({ where: { id }, data });
  return NextResponse.json(contact);
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  const { id } = await request.json();
  await prisma.contact.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
