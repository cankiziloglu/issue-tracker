import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import { Issue } from '@prisma/client';
import { Heading, Flex, Card } from '@radix-ui/themes';
import Markdown from 'react-markdown';

export default function IssueView({ issue }: { issue: Issue }) {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex gap='4' my='4'>
        <IssueStatusBadge status={issue.status} />
        <p>{issue.createdAt.toDateString()}</p>
      </Flex>
      <Card className='prose max-w-full'>
        <Markdown>{issue.description}</Markdown>
      </Card>
    </>
  );
}
