import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  const [
    contacts,
    contactsUnread,
    blog,
    blogPublished,
    temoignages,
    temoignagesPublished,
  ] = await Promise.all([
    prisma.contact.count(),
    prisma.contact.count({ where: { read: false } }),
    prisma.blogPost.count(),
    prisma.blogPost.count({ where: { published: true } }),
    prisma.testimonial.count(),
    prisma.testimonial.count({ where: { published: true } }),
  ]);

  return NextResponse.json({
    contacts,
    contactsUnread,
    blog,
    blogPublished,
    temoignages,
    temoignagesPublished,
  });
}
