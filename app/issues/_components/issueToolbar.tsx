import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import IssueStatusFilter from './IssueStatusFilter';

export default function IssueToolbar() {
  return (
    <Flex mb='5' justify='between'>
      <IssueStatusFilter />
      <Button>
        <Link href='/issues/new'>New Issue</Link>
      </Button>
    </Flex>
  );
}
