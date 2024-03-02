import React from 'react';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import { Box, Button, Card, Flex, Grid, Heading } from '@radix-ui/themes';
import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import Markdown from 'react-markdown';
import Link from 'next/link';
import { AiFillEdit } from 'react-icons/ai';

export default async function IssueDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: '1', sm: '2' }} gap='5'>
      <Box>
        <Heading>{issue.title}</Heading>
        <Flex gap='4' my='4'>
          <IssueStatusBadge status={issue.status} />
          <p>{issue.createdAt.toDateString()}</p>
        </Flex>
        <Card className='prose'>
          <Markdown>{issue.description}</Markdown>
        </Card>
      </Box>
      <Box>
        <Button>
          <AiFillEdit />
          <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
        </Button>
      </Box>
    </Grid>
  );
}
