import { Emoji } from 'emoji-picker-react';

import type { SelectableData } from '@/types/SelectableData';
import type { Member } from '@prisma/client';
import type { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<SelectableData<Member>>[] = [
  {
    accessorKey: 'name',
    header: '名前',
    cell: ({ row }) => {
      const { model: member } = row.original;

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
];
