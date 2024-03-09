import Button from '@/components/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getAllPlayers } from '@/features/games/logic';
import { Rule } from '@prisma/client';
import { MoreHorizontal } from 'lucide-react';

import type { Game } from '@/types/models/Game';
import type { ColumnDef } from '@tanstack/react-table';

export const createColumns = (
  deleteGameById: (id: Game['id']) => Promise<void>,
  openGame: (id: Game['id']) => Promise<void>,
): ColumnDef<Game>[] => {
  return [
    {
      id: 'gameNumber',
      header: 'No.',
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: 'participants',
      header: () => <div className="text-right">参加者数</div>,
      cell: ({ row }) => {
        const game = row.original;
        const totalParticipants = getAllPlayers(game).length;

        return <div className="text-right">{`${totalParticipants} 人`}</div>;
      },
    },
    {
      accessorKey: 'singlesCount',
      header: () => <div className="text-right">シングルス数</div>,
      cell: ({ row }) => {
        const game = row.original;
        const singlesCount = game.gameDetails.filter(
          (gameDetail) => gameDetail.rule === Rule.SINGLES,
        ).length;

        return <div className="text-right">{`${singlesCount} 試合`}</div>;
      },
    },
    {
      accessorKey: 'doublesCount',
      header: () => <div className="text-right">ダブルス数</div>,
      cell: ({ row }) => {
        const game = row.original;
        const doublesCount = game.gameDetails.filter(
          (gameDetail) => gameDetail.rule === Rule.DOUBLES,
        ).length;

        return <div className="text-right">{`${doublesCount} 試合`}</div>;
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const game = row.original;

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
                onClick={() => deleteGameById(game.id)}
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
