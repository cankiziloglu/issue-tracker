import prisma from '@/prisma/client';
import { Table } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';
import IssueStatusBadge from '../components/IssueStatusBadge';
import IssueToolbar from './issueToolbar';

export default async function IssuesPage() {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: 'desc' },
    include: { assignedTo: true },
  });

  return (
    <>
      <IssueToolbar />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>
              Created At
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>
              Assigned To
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link
                  href={`/issues/${issue.id}`}
                  className='font-medium hover:underline'
                >
                  {issue.title}
                </Link>
                <span className='block md:hidden'>
                  <IssueStatusBadge status={issue.status} />
                </span>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                {issue.createdAt.toDateString()}
              </Table.Cell>
              <Table.Cell>{issue.assignedTo?.name || 'Unassigned'}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
}

export const dynamic = 'force-dynamic';
