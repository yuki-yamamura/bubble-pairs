import Button from '@/components/Button';
import DecoratedMember from '@/features/members/components/DecoratedMember';
import { Trash2 } from 'lucide-react';

import type { Member } from '@prisma/client';
import type { ColumnDef } from '@tanstack/react-table';

export const createColumns = (
  deleteRowByIndex: (index: number) => void,
): ColumnDef<Member>[] => {
  return [
    {
      accessorKey: 'name',
      header: '名前',
      cell: ({ row }) => <DecoratedMember member={row.original} />,
    },
    {
      id: 'deletion',
      cell: ({ row }) => {
        const member = row.original;

        return (
          <div className="flex justify-end">
            <Button
              type="button"
              variant="ghost"
              aria-label={`${member.name}を削除`}
              className="h-8 w-8 p-0"
            >
              <Trash2
                onClick={() => deleteRowByIndex(row.index)}
                className="h-4 w-4 stroke-1"
              />
            </Button>
          </div>
        );
      },
    },
  ];
};
