'use client';

import { User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function AssigneeSelect() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await axios.get('/api/users');
      setUsers(users.data);
    };
    fetchUsers();
  }, []);

  return (
    <Select.Root>
      <Select.Trigger placeholder='Assignee' />
      <Select.Content>
        <Select.Group>
          <Select.Label>Select Assignee</Select.Label>
          {users.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}
