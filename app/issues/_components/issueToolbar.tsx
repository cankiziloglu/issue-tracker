import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import IssueStatusFilter from './IssueStatusFilter';

export default function IssueToolbar() {
  return (
    <Flex justify='between'>
      <IssueStatusFilter />
      <Button>
        <Link href='/issues/new'>New Issue</Link>
      </Button>
    </Flex>
  );
}
