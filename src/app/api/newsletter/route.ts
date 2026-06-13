import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
export async function POST(request: Request) {
  const { email } = await request.json();
  if (!email) return NextResponse.json({ error: 'Email requis' }, { status: 400 });
  const existing = await prisma.newsletter.findUnique({ where: { email } });
  if (existing) return NextResponse.json({ message: 'Déjà inscrit' });
  await prisma.newsletter.create({ data: { email } });
  return NextResponse.json({ success: true });
}