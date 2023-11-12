import { $Enums } from '@prisma/client';

import type { SortKey } from '@/features/members/types/SortKey';
import type { Member } from '@prisma/client';

export const sortMembers = (members: Member[], sortKey: SortKey): Member[] => {
  const { Level, Sex } = $Enums;

  const getCompareFn = () => {
    switch (sortKey) {
      case 'createdAt': {
        return (a: Member, b: Member) => (a.createdAt > b.createdAt ? 1 : -1);
      }
      case 'displayName': {
        return (a: Member, b: Member) => {
          return (a[sortKey] ?? a['kana'] ?? b['name']) >
            (b[sortKey] ?? b['kana'] ?? b['name'])
            ? 1
            : -1;
        };
      }
      case 'level': {
        const levelOrderList = Object.values(Level);

        return (a: Member, b: Member) =>
          levelOrderList.indexOf(a[sortKey]) -
          levelOrderList.indexOf(b[sortKey]);
      }
      case 'sex': {
        const sexOrderList = [Sex.MALE, Sex.FEMALE, Sex.NOT_KNOWN];

        return (a: Member, b: Member) =>
          sexOrderList.indexOf(a[sortKey]) - sexOrderList.indexOf(b[sortKey]);
      }
      default: {
        const _check: never = sortKey;
      }
    }
  };

  const compareFn = getCompareFn();

  return members.sort(compareFn);
};
