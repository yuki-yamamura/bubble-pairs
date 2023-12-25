import { levelOptions } from '@/features/members/constants/levelOptions';
import { sexOptions } from '@/features/members/constants/sexOptions';
import { useCallback, useState } from 'react';

import type { Options } from '@/types/Options';
import type { Level, Member, Sex } from '@prisma/client';
import type { Dispatch, SetStateAction } from 'react';

export const useFilter = (): {
  levelOptions: Options<Level>;
  sexOptions: Options<Sex>;
  selectedLevels: Level[];
  selectedSexes: Sex[];
  setSelectedLevels: Dispatch<SetStateAction<Level[]>>;
  setSelectedSexes: Dispatch<SetStateAction<Sex[]>>;
  filterMembers: (member: Member[]) => Member[];
} => {
  const [selectedSexes, setSelectedSexes] = useState<Sex[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<Level[]>([]);

  const filterMembers = useCallback(
    (members: Member[]) => {
      let _members = members;

      const filterMembersByLevel = (members: Member[]) =>
        selectedLevels.length === 0
          ? members
          : members.filter((member) => selectedLevels.includes(member.level));
      const filterMembersBySex = (members: Member[]) =>
        selectedSexes.length === 0
          ? members
          : members.filter((member) => selectedSexes.includes(member.sex));

      (() => {
        _members = filterMembersByLevel(_members);
        _members = filterMembersBySex(_members);
      })();

      return _members;
    },
    [selectedLevels, selectedSexes],
  );

  return {
    levelOptions,
    sexOptions,
    selectedSexes,
    selectedLevels,
    setSelectedSexes,
    setSelectedLevels,
    filterMembers,
  };
};
