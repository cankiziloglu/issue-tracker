'use client';
import { Status } from '.prisma/client';
import { Select } from '@radix-ui/themes';

export default function IssueStatusFilter() {
  const statusFilter: { label: string; value?: Status }[] = [
    { label: 'All' },
    { label: 'Open', value: 'OPEN' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Done', value: 'DONE' },
  ];

  return (
    <Select.Root>
      <Select.Trigger placeholder='Filter by Status...' />
      <Select.Content>
        <Select.Group>
          <Select.Label>Status</Select.Label>
          {statusFilter.map((status) => (
            <Select.Item key={status.label} value={status.value || 'All'}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}
