import Button from '@/components/Button';
import { Emoji } from 'emoji-picker-react';
import { Trash2 } from 'lucide-react';

import type { Member } from '@prisma/client';
import type { ColumnDef } from '@tanstack/react-table';

export const createColumns = (actions: {
  deleteRowByIndex: (index: number) => void;
}): ColumnDef<Member>[] => {
  return [
    {
      accessorKey: 'name',
      header: '名前',
      cell: ({ row }) => {
        const member = row.original;

        return (
          <div className="flex items-center gap-x-4">
            <div className="max-w-fit rounded-full bg-gray-50 p-2">
              <Emoji unified={member.emojiUnicode} size={16} />
            </div>
            {member.name}
          </div>
        );
      },
    },
    {
      id: 'deletion',
      cell: ({ row }) => {
        const { deleteRowByIndex } = actions;
        const member = row.original;

        return (
          <div className="flex justify-end">
            <Button type="button" variant="ghost" className="h-8 w-8 p-0">
              <Trash2
                aria-label={`${member.name}を削除`}
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
