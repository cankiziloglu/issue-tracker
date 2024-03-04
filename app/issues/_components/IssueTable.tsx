import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import { Issue, Status, User } from '@prisma/client';
import { Table, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';
import { AiFillCaretUp, AiFillCaretDown } from 'react-icons/ai';

type Sort = 'asc' | 'desc';

type IssueExtended = Issue & {
  assignedTo: {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
  } | null;
};

export type IssueQuery = {
  status: Status;
  orderBy: string;
  sort: Sort;
  page: string;
};

type IssueTableProps = {
  searchParams: IssueQuery;
  issues: IssueExtended[];
  sort: Sort;
};

export default function IssueTable({
  searchParams,
  issues,
  sort,
}: IssueTableProps) {
  const toggleSort = (col: string, dir: Sort) => {
    if (col === searchParams.orderBy) {
      return dir === 'asc' ? 'desc' : 'asc';
    }
    return 'asc';
  };

  return (
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
  );
}

const columns: { label: string; key: string; class?: string }[] = [
  { label: 'Issue', key: 'title' },
  { label: 'Status', key: 'status', class: 'hidden md:table-cell' },
  { label: 'Created At', key: 'createdAt', class: 'hidden md:table-cell' },
  { label: 'Assigned To', key: 'assignedTo', class: 'hidden md:table-cell' },
];

export const columnNames = columns.map((column) => column.key);
