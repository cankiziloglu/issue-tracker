import { Status } from '.prisma/client';
import prisma from '@/prisma/client';
import { Flex } from '@radix-ui/themes';
import IssueTable, { IssueQuery, columnNames } from './_components/IssueTable';
import Pagination from './_components/Pagination';
import IssueToolbar from './_components/issueToolbar';

type Sort = 'asc' | 'desc';

export default async function IssuesPage({
  searchParams,
}: {
  searchParams: IssueQuery;
}) {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const where = { status };

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
    orderBy = columnNames.includes(searchParams.orderBy)
      ? { [searchParams.orderBy]: sort || 'asc' }
      : undefined;
  }

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    include: { assignedTo: true },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction='column' gap='4'>
      <IssueToolbar />
      <IssueTable issues={issues} searchParams={searchParams} sort={sort} />
      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </Flex>
  );
}

export const dynamic = 'force-dynamic';
