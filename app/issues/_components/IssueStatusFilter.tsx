'use client';
import { Status } from '.prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';

export default function IssueStatusFilter() {
  const statusFilter: { label: string; value?: Status }[] = [
    { label: 'All' },
    { label: 'Open', value: 'OPEN' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Done', value: 'DONE' },
  ];

  const router = useRouter();

  return (
    <Select.Root
      onValueChange={(value) => {
        const param = value === 'All' ? '' : `?status=${value}`;
        router.push(`/issues${param}`);
      }}
    >
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
