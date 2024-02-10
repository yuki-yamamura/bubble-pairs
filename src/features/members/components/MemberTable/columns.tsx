import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { levelMap, sexMap } from '@/constants';
import dayjs from 'dayjs';
import { MoreHorizontal } from 'lucide-react';

import type { Member } from '@prisma/client';
import type { ColumnDef } from '@tanstack/react-table';

export const createColumns = (actions: {
  deleteMember: (memberId: Member['id']) => Promise<void>;
  openMemberDetail: (memberId: Member['id']) => Promise<void>;
}): ColumnDef<Member>[] => {
  return [
    {
      accessorKey: 'createdAt',
      header: '登録日',
      cell: ({ row }) => dayjs(row.original.createdAt).format('YYYY/MM/DD'),
    },
    {
      accessorKey: 'name',
      header: '名前',
    },
    {
      accessorKey: 'sex',
      header: '性別',
      cell: ({ row }) => sexMap.get(row.original.sex),
    },
    {
      accessorKey: 'level',
      header: 'レベル',
      cell: ({ row }) => levelMap.get(row.original.level),
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const member = row.original;
        const { deleteMember, openMemberDetail } = actions;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal
                  className="h-4 w-4"
                  aria-label="メニューを開く"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => openMemberDetail(member.id)}>
                詳細を見る
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => deleteMember(member.id)}
                className="text-destructive"
              >
                削除
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};
