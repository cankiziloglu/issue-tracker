'use client';

import { User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function AssigneeSelect() {
  const { data: users, error } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const users = await axios.get('/api/users').then((res) => res.data);
      return users;
    },
  });

  if (error) return null;

  return (
    <Select.Root>
      <Select.Trigger placeholder='Assignee' />
      <Select.Content>
        <Select.Group>
          <Select.Label>Select Assignee</Select.Label>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}
