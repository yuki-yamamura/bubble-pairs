import { options } from './options';
import { sortMembers } from './sortMembers';
import { useCallback, useState } from 'react';

import type { SortKey } from '@/features/members/types/SortKey';
import type { Member } from '@prisma/client';

const useSort = (): {
  options: typeof options;
  selectedSortKey: SortKey;
  selectSortKey: (sortKey: SortKey) => void;
  sortMembers: (members: Member[], sortKey: SortKey) => Member[];
} => {
  const [selectedSortKey, setSelectedSortKey] = useState<SortKey>('createdAt');

  const selectSortKey = useCallback(
    (sortKey: SortKey) => setSelectedSortKey(sortKey),
    [],
  );

  return {
    options,
    selectedSortKey,
    selectSortKey,
    sortMembers: useCallback(sortMembers, []),
  };
};

export default useSort;
