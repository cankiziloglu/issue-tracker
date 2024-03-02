import React from 'react';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import { Box, Button, Card, Flex, Grid, Heading } from '@radix-ui/themes';
import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import Markdown from 'react-markdown';
import Link from 'next/link';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import EditIssueButton from '../_components/EditIssueButton';
import DeleteIssueButton from '../_components/DeleteIssueButton';
import IssueView from '../_components/IssueView';

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
        <IssueView issue={issue} />
      </Box>
      <Box>
        <Flex direction='column' gap='4'>
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Flex>
      </Box>
    </Grid>
  );
}
