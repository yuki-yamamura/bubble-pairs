import { Button } from '@/components/ui/button';
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
  closeActivity: (id: string) => Promise<void>;
  deleteActivity: (id: string) => Promise<void>;
  openActivity: (id: string) => Promise<void>;
}): ColumnDef<Activity>[] => {
  return [
    {
      accessorKey: 'isOpen',
      header: undefined,
      cell: ({ row }) => {
        const { isOpen } = row.original;

        return isOpen ? (
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
        const gamesCount = row.original.games.length;

        return <div className="text-right">{`${gamesCount} 回`}</div>;
      },
    },
    {
      accessorKey: 'participants',
      header: () => <div className="whitespace-nowrap text-right">参加者</div>,
      cell: ({ row }) => {
        const participantsCount = row.original.participants.length;

        return <div className="text-right">{`${participantsCount} 人`}</div>;
      },
    },
    {
      accessorKey: 'placeId',
      header: '場所',
      cell: ({ row }) => {
        const placeName = row.original.place.name;

        return placeName;
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const activity = row.original;
        const { closeActivity, deleteActivity, openActivity } = actions;

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
                <DropdownMenuItem onClick={() => closeActivity(activity.id)}>
                  完了する
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => deleteActivity(activity.id)}
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
