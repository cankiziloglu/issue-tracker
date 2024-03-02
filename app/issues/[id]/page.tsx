import React from 'react';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import { Box, Button, Card, Flex, Grid, Heading } from '@radix-ui/themes';
import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import Markdown from 'react-markdown';
import Link from 'next/link';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';

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
    <Grid columns={{ initial: '1', sm: '5' }} gap='5'>
      <Box className='md:col-span-4'>
        <Heading>{issue.title}</Heading>
        <Flex gap='4' my='4'>
          <IssueStatusBadge status={issue.status} />
          <p>{issue.createdAt.toDateString()}</p>
        </Flex>
        <Card className='prose max-w-full'>
          <Markdown>{issue.description}</Markdown>
        </Card>
      </Box>
      <Box>
        <Flex direction='column' gap='4'>
          <Button>
            <AiFillEdit />
            <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
          </Button>
          <Button color='red'>
            <AiFillDelete />
            <Link href={`/issues/${issue.id}/delete`}>Delete Issue</Link>
          </Button>
        </Flex>
      </Box>
    </Grid>
  );
}
