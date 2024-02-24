import DecoratedMember from '@/features/members/components/DecoratedMember';

import type { SelectableData } from '@/types/SelectableData';
import type { Member } from '@prisma/client';
import type { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<SelectableData<Member>>[] = [
  {
    accessorKey: 'name',
    header: '名前',
    cell: ({ row }) => <DecoratedMember member={row.original.model} />,
  },
];
