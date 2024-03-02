'use client';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { AiFillDelete } from 'react-icons/ai';

export default function DeleteIssueButton({ issueId }: { issueId: number }) {
  const router = useRouter();

  const handleDelete = async () => {
    await axios.delete(`/api/issues/${issueId}`);
    router.push('/issues');
    router.refresh();
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color='red' type={undefined}>
          <AiFillDelete />
          Delete Issue
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
        <AlertDialog.Description size='2'>
          Are you sure? This issue will be deleted permanently.
        </AlertDialog.Description>

        <Flex gap='3' mt='4' justify='end'>
          <AlertDialog.Cancel>
            <Button variant='soft' color='gray' type={undefined}>
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color='red' type={undefined} onClick={handleDelete}>
              Delete Issue
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
