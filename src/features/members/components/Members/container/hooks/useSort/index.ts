import { options } from './options';
// import sortMembers as another name to avoid conflict.
import { sortMembers as sort } from './sortMembers';
import { useCallback, useState } from 'react';

import type { SortKey } from '@/features/members/types/SortKey';
import type { Member } from '@prisma/client';

export const useSort = (): {
  options: typeof options;
  selectedSortKey: SortKey;
  selectSortKey: (sortKey: SortKey) => void;
  sortMembers: (members: Member[]) => Member[];
} => {
  const [selectedSortKey, setSelectedSortKey] = useState<SortKey>('createdAt');

  const selectSortKey = useCallback(
    (sortKey: SortKey) => setSelectedSortKey(sortKey),
    [],
  );
  const sortMembers = useCallback(
    (members: Member[]) => sort(members, selectedSortKey),
    [selectedSortKey],
  );

  return {
    options,
    selectedSortKey,
    selectSortKey,
    sortMembers,
  };
};
