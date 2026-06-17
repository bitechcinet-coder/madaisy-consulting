import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json({ error: 'Email valide requis' }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existing = await prisma.newsletter.findUnique({ where: { email: normalizedEmail } });
    if (existing) return NextResponse.json({ message: 'Déjà inscrit' });

    await prisma.newsletter.create({ data: { email: normalizedEmail } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
