import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import { AiFillEdit } from 'react-icons/ai';

export default function EditIssueButton({ issueId }: { issueId: number }) {
  return (
    <Button>
      <AiFillEdit />
      <Link href={`/issues/${issueId}/edit`}>Edit Issue</Link>
    </Button>
  );
}
