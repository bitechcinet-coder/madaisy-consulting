import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

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
