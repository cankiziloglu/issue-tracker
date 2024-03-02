import { IssueSchema } from '@/app/validationSchemas';
import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validated = IssueSchema.safeParse(body);
  if (!validated.success)
    return NextResponse.json(validated.error.errors, { status: 400 });

  const issue = prisma.issue.findUnique({ where: { id: parseInt(params.id) } });

  if (!issue)
    return NextResponse.json({ message: 'Issue not found' }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: parseInt(params.id) },
    data: {
      title: validated.data.title,
      description: validated.data.description,
    },
  });

  return NextResponse.json(updatedIssue, { status: 201 });
}
