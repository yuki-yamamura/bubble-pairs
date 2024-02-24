import Button from '@/components/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import dayjs from 'dayjs';
import { CheckCircle2, CircleDot, MoreHorizontal } from 'lucide-react';

import type { Activity } from '@/types/models/Activity';
import type { ColumnDef } from '@tanstack/react-table';

export const createColumns = (actions: {
  closeActivityById: (id: Activity['id']) => Promise<void>;
  deleteActivityById: (id: Activity['id']) => Promise<void>;
  openActivity: (id: Activity['id']) => Promise<void>;
}): ColumnDef<Activity>[] => {
  return [
    {
      accessorKey: 'isOpen',
      header: undefined,
      cell: ({ row }) => {
        const activity = row.original;

        return activity.isOpen ? (
          <CircleDot size={16} className="text-slate-400" />
        ) : (
          <CheckCircle2 size={16} className="text-purple-400" />
        );
      },
    },
    {
      accessorKey: 'createdAt',
      header: '開始日',
      cell: ({ row }) => {
        const date = row.original.createdAt;
        const formattedDate = dayjs(date).format('YYYY/MM/DD');

        return formattedDate;
      },
    },
    {
      accessorKey: 'games',
      header: () => <div className="text-right">試合数</div>,
      cell: ({ row }) => {
        const { games } = row.original;

        return <div className="text-right">{`${games.length} 回`}</div>;
      },
    },
    {
      accessorKey: 'participants',
      header: () => (
        <div className="whitespace-nowrap text-right">参加者数</div>
      ),
      cell: ({ row }) => {
        const { participants } = row.original;

        return <div className="text-right">{`${participants.length} 人`}</div>;
      },
    },
    {
      accessorKey: 'placeId',
      header: '活動場所',
      cell: ({ row }) => {
        const { place } = row.original;

        return place.name;
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const activity = row.original;
        const { closeActivityById, deleteActivityById, openActivity } = actions;

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
              <DropdownMenuItem onClick={() => openActivity(activity.id)}>
                詳細を見る
              </DropdownMenuItem>
              {activity.isOpen && (
                <DropdownMenuItem
                  onClick={() => closeActivityById(activity.id)}
                >
                  終了する
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => deleteActivityById(activity.id)}
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
