'use client';

import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function AssigneeSelect({ issue }: { issue: Issue }) {
  const { data: users, error } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const users = await axios.get('/api/users').then((res) => res.data);
      return users;
    },
  });

  if (error) return null;

  const handleAssign = async (value: string | null) => {
    if (value === 'unassigned') value = null;
    await axios
      .patch(`/api/issues/${issue.id}`, { assignedToId: value })
      .catch((err) => {
        toast.error('Failed to assign user');
      });
  };

  return (
    <>
      <Select.Root
        onValueChange={handleAssign}
        defaultValue={issue.assignedToId || 'unassigned'}
      >
        <Select.Trigger />
        <Select.Content>
          <Select.Group>
            <Select.Label>Select Assignee</Select.Label>
            <Select.Item value='unassigned'>Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
}
