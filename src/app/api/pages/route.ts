import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const admin = searchParams.get('admin') === 'true';

  const pages = await prisma.page.findMany({
    where: admin ? {} : { published: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(pages);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  const body = await request.json();
  const page = await prisma.page.create({ data: body });
  return NextResponse.json(page);
}

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  const { id, ...data } = await request.json();
  const page = await prisma.page.update({ where: { id }, data });
  return NextResponse.json(page);
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  const { id } = await request.json();
  await prisma.page.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
