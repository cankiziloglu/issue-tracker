import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const createIssueSchema = z.object({
  title: z.string().min(1, 'Title must contain at least 1 char').max(255, 'Title must contain at most 255 chars'),
  description: z.string().min(1, 'Description must contain at least 1 char'),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validated = createIssueSchema.safeParse(body);
  if (!validated.success)
    return NextResponse.json(validated.error.errors, { status: 400 });

  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
