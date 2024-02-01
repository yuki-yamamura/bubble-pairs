import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import axios from 'axios';
import dayjs from 'dayjs';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

import type { Activity } from '@/types/models/Activity';
import type { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Activity>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
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

      const closeActivity = async () => {
        await axios.put(`/api/activities/${activity.id}`, {
          isOpen: false,
        });
      };
      const deleteActivity = async () => {
        await axios.delete(`/api/activities/${activity.id}`);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" aria-label="メニューを開く" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/activities/${activity.id}`}>詳細を見る</Link>
            </DropdownMenuItem>
            {activity.isOpen && (
              <DropdownMenuItem onClick={closeActivity}>
                完了する
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={deleteActivity}
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
