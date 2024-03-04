import prisma from '@/prisma/client';
import { Flex, Table, Text } from '@radix-ui/themes';
import Link from 'next/link';
import IssueStatusBadge from '../components/IssueStatusBadge';
import IssueToolbar from './_components/issueToolbar';
import { Status } from '.prisma/client';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';

type Sort = 'asc' | 'desc';

export default async function IssuesPage({
  searchParams,
}: {
  searchParams: { status: Status; orderBy: string; sort: Sort };
}) {
  const columns: { label: string; key: string; class?: string }[] = [
    { label: 'Issue', key: 'title' },
    { label: 'Status', key: 'status', class: 'hidden md:table-cell' },
    { label: 'Created At', key: 'createdAt', class: 'hidden md:table-cell' },
    { label: 'Assigned To', key: 'assignedTo', class: 'hidden md:table-cell' },
  ];

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const sortOptions: Sort[] = ['asc', 'desc'];
  const sort: Sort = sortOptions.includes(searchParams.sort)
    ? searchParams.sort
    : 'asc';

  let orderBy;
  if (searchParams.orderBy && searchParams.orderBy === 'assignedTo') {
    orderBy = {
      assignedTo: {
        name: sort || 'asc',
      },
    };
  } else if (searchParams.orderBy) {
    orderBy = columns.map((column) => column.key).includes(searchParams.orderBy)
      ? { [searchParams.orderBy]: sort || 'asc' }
      : undefined;
  }

  const issues = await prisma.issue.findMany({
    where: { status },
    include: { assignedTo: true },
    orderBy,
  });

  const toggleSort = (col: string, dir: Sort) => {
    if (col === searchParams.orderBy) {
      return dir === 'asc' ? 'desc' : 'asc';
    }
    return 'asc';
  };

  return (
    <>
      <IssueToolbar />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell className={column.class} key={column.key}>
                <Link
                  href={{
                    query: {
                      ...searchParams,
                      orderBy: column.key,
                      sort: toggleSort(column.key, sort),
                    },
                  }}
                >
                  {column.label}{' '}
                  {column.key === searchParams.orderBy && sort === 'asc' && (
                    <AiFillCaretUp className='inline' />
                  )}
                  {column.key === searchParams.orderBy && sort === 'desc' && (
                    <AiFillCaretDown className='inline' />
                  )}
                </Link>
              </Table.ColumnHeaderCell>
            ))}
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
                <Flex direction='row' justify='between' className='md:hidden'>
                  <IssueStatusBadge status={issue.status} />
                  <Text size='1' className='md:hidden'>
                    {' '}
                    {issue.assignedTo?.name || 'Unassigned'}
                  </Text>
                </Flex>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                {issue.createdAt.toDateString()}
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                {issue.assignedTo?.name || 'Unassigned'}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
}

export const dynamic = 'force-dynamic';
