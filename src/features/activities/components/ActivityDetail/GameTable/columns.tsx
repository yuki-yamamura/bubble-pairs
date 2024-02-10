import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { $Enums } from '@prisma/client';
import { MoreHorizontal } from 'lucide-react';

import type { Game } from '@/types/models/Game';
import type { ColumnDef } from '@tanstack/react-table';

export const createColumns = (actions: {
  deleteGame: (id: string) => Promise<void>;
  openGame: (id: string) => Promise<void>;
}): ColumnDef<Game>[] => {
  return [
    {
      id: 'gameNumber',
      header: 'ゲーム No.',
      cell: ({ row }) => row.index + 1,
    },
    {
      id: 'singlesCount',
      header: 'シングルス数',
      cell: ({ row }) => {
        const game = row.original;
        const singlesCount = game.gameDetails.filter(
          (gameDetail) => gameDetail.rule === $Enums.Rule.SINGLES,
        ).length;

        return singlesCount;
      },
    },
    {
      id: 'doublesCount',
      header: 'ダブルス数',
      cell: ({ row }) => {
        const game = row.original;
        const doublesCount = game.gameDetails.filter(
          (gameDetail) => gameDetail.rule === $Enums.Rule.DOUBLES,
        ).length;

        return doublesCount;
      },
    },
    {
      id: 'playerCount',
      header: '参加者数',
      cell: ({ row }) => {
        const { participants } = row.original.activity;

        return participants.length;
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const game = row.original;
        const { deleteGame, openGame } = actions;

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
              <DropdownMenuItem onClick={() => openGame(game.id)}>
                詳細を見る
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => deleteGame(game.id)}
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
