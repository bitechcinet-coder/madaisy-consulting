import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const take = parseInt(searchParams.get('take') || '20', 10);
  const skip = parseInt(searchParams.get('skip') || '0', 10);

  const items = await prisma.testimonial.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    take,
    skip,
  });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  const body = await request.json();
  const item = await prisma.testimonial.create({ data: body });
  return NextResponse.json(item);
}

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  const { id, ...data } = await request.json();
  const item = await prisma.testimonial.update({ where: { id }, data });
  return NextResponse.json(item);
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  const { id } = await request.json();
  await prisma.testimonial.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
