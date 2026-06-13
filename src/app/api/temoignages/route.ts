import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const items = await prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const body = await request.json();
  const item = await prisma.testimonial.create({ data: body });
  return NextResponse.json(item);
}

export async function PATCH(request: Request) {
  const { id, ...data } = await request.json();
  const item = await prisma.testimonial.update({ where: { id }, data });
  return NextResponse.json(item);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  await prisma.testimonial.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
