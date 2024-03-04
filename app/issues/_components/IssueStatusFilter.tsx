'use client';
import { Status } from '.prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';

export default function IssueStatusFilter() {
  const statusFilter: { label: string; value?: Status }[] = [
    { label: 'All' },
    { label: 'Open', value: 'OPEN' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Done', value: 'DONE' },
  ];

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilter = (value: string) => {
    const orderBy = searchParams.get('orderBy');
    const sort = searchParams.get('sort');
    const params = new URLSearchParams();
    if (value) params.append('status', value);
    if (orderBy) params.append('orderBy', orderBy);
    if (sort) params.append('sort', sort);
    const param = params.size ? `?${params.toString()}` : '';
    router.push(`/issues${param}`);
  };

  return (
    <Select.Root
      onValueChange={handleFilter}
      defaultValue={searchParams.get('status') || ''}
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
