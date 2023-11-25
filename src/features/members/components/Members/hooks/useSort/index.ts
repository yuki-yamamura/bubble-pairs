import { sortKeyOptions } from './options';
import { Level, type Member, Sex } from '@prisma/client';
import { useCallback, useState } from 'react';

import type { SortKey } from '@/features/members/types/SortKey';
import type { Options } from '@/types/Options';
import type { Dispatch, SetStateAction } from 'react';

export const useSort = (): {
  sortKeyOptions: Options<SortKey>;
  selectedSortKey: SortKey;
  setSelectedSortKey: Dispatch<SetStateAction<SortKey>>;
  sortMembers: (members: Member[]) => Member[];
} => {
  const defaultSortKey = sortKeyOptions[0].value;
  const [selectedSortKey, setSelectedSortKey] =
    useState<SortKey>(defaultSortKey);

  const sortMembers = useCallback(
    (members: Member[]): Member[] => {
      const getCompareFn = () => {
        switch (selectedSortKey) {
          case 'createdAt': {
            return (a: Member, b: Member) =>
              a.createdAt > b.createdAt ? 1 : -1;
          }
          case 'displayName': {
            return (a: Member, b: Member) => {
              return (a[selectedSortKey] ?? a['kana'] ?? b['name']) >
                (b[selectedSortKey] ?? b['kana'] ?? b['name'])
                ? 1
                : -1;
            };
          }
          case 'level': {
            const levelOrderList = Object.values(Level);

            return (a: Member, b: Member) =>
              levelOrderList.indexOf(a[selectedSortKey]) -
              levelOrderList.indexOf(b[selectedSortKey]);
          }
          case 'sex': {
            const sexOrderList = [Sex.MALE, Sex.FEMALE, Sex.NOT_KNOWN];

            return (a: Member, b: Member) =>
              sexOrderList.indexOf(a[selectedSortKey]) -
              sexOrderList.indexOf(b[selectedSortKey]);
          }
          default: {
            const _check: never = selectedSortKey;
          }
        }
      };

      const compareFn = getCompareFn();

      return members.sort(compareFn);
    },
    [selectedSortKey],
  );

  return {
    sortKeyOptions,
    selectedSortKey,
    setSelectedSortKey,
    sortMembers,
  };
};
