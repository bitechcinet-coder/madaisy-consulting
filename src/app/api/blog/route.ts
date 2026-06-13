import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const body = await request.json();
  const post = await prisma.blogPost.create({ data: body });
  return NextResponse.json(post);
}

export async function PATCH(request: Request) {
  const { id, ...data } = await request.json();
  const post = await prisma.blogPost.update({ where: { id }, data });
  return NextResponse.json(post);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  await prisma.blogPost.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
