import { $Enums } from '@prisma/client';

import type { SortKey } from './options';
import type { Member } from '@prisma/client';

export const sortMembers = (members: Member[], sortKey: SortKey): Member[] => {
  const { Level, Sex } = $Enums;

  const getCompareFn = () => {
    switch (sortKey) {
      case 'createdAt': {
        return (a: Member, b: Member) => (a.createdAt > b.createdAt ? 1 : -1);
      }
      case 'kana': {
        return (a: Member, b: Member) => {
          if (a[sortKey] === b[sortKey]) {
            return 0;
          }
          if (a[sortKey] === null) {
            return 1;
          }
          if (b[sortKey] === null) {
            return -1;
          }

          return (a[sortKey] as string) > (b[sortKey] as string) ? 1 : -1;
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
