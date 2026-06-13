import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const contacts = await prisma.contact.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(contacts);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const contact = await prisma.contact.create({ data: body });
    return NextResponse.json(contact);
  } catch {
    return NextResponse.json({ error: 'Erreur' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const { id, ...data } = await request.json();
  const contact = await prisma.contact.update({ where: { id }, data });
  return NextResponse.json(contact);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  await prisma.contact.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
