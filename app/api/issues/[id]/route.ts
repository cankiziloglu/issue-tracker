import authOptions from '@/app/auth/authOptions';
import { IssueSchema, patchIssueSchema } from '@/app/validationSchemas';
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const validated = patchIssueSchema.safeParse(body);
  if (!validated.success)
    return NextResponse.json(validated.error.errors, { status: 400 });

  const issue = prisma.issue.findUnique({ where: { id: parseInt(params.id) } });

  if (!issue)
    return NextResponse.json({ message: 'Issue not found' }, { status: 404 });

  const { title, description, assignedToId } = validated.data;

  if (assignedToId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToId },
    });

    if (!user)
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: parseInt(params.id) },
    data: {
      title,
      description,
      assignedToId,
    },
  });

  return NextResponse.json(updatedIssue, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const issue = prisma.issue.findUnique({ where: { id: parseInt(params.id) } });

  if (!issue)
    return NextResponse.json({ message: 'Issue not found' }, { status: 404 });

  await prisma.issue.delete({ where: { id: parseInt(params.id) } });

  return NextResponse.json({}, { status: 200 });
}
