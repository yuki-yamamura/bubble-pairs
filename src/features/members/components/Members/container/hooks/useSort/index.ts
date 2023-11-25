import { options } from './options';
import { sortMembers as sort } from './sortMembers';
import { useCallback, useState } from 'react';

import type { SortKey } from '@/features/members/types/SortKey';
import type { Options } from '@/types/Options';
import type { Member } from '@prisma/client';
import type { Dispatch, SetStateAction } from 'react';

export const useSort = (): {
  options: Options;
  selectedSortKey: SortKey;
  setSelectedSortKey: Dispatch<SetStateAction<SortKey>>;
  sortMembers: (members: Member[]) => Member[];
} => {
  const [selectedSortKey, setSelectedSortKey] = useState<SortKey>('createdAt');

  const sortMembers = useCallback(
    (members: Member[]) => sort(members, selectedSortKey),
    [selectedSortKey],
  );

  return {
    options,
    selectedSortKey,
    setSelectedSortKey,
    sortMembers,
  };
};
