import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import { AiFillDelete } from 'react-icons/ai';

export default function DeleteIssueButton({ issueId }: { issueId: number }) {
  return (
    <Button color='red'>
      <AiFillDelete />
      <Link href={`/issues/${issueId}/delete`}>Delete Issue</Link>
    </Button>
  );
}
