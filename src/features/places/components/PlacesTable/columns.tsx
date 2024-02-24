import Button from '@/components/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';

import type { Place } from '@prisma/client';
import type { ColumnDef } from '@tanstack/react-table';

export const createColumns = (actions: {
  deletePlace: (placeId: Place['id']) => Promise<void>;
  openPlaceDetail: (placeId: Place['id']) => Promise<void>;
}): ColumnDef<Place>[] => {
  return [
    {
      accessorKey: 'name',
      header: '名前',
    },
    {
      accessorKey: 'courtCount',
      header: 'コート数',
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const place = row.original;
        const { deletePlace, openPlaceDetail } = actions;

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
              <DropdownMenuItem onClick={() => deletePlace(place.id)}>
                詳細を開く
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => openPlaceDetail(place.id)}
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
