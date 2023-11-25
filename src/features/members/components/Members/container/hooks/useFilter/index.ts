import { filterMembers as filter } from './filterMembers';
import { useCallback, useState } from 'react';

import type { Level, Member, Sex } from '@prisma/client';
import type { Dispatch, SetStateAction } from 'react';

export const useFilter = (): {
  selectedSexes: Sex[];
  selectedLevels: Level[];
  setSelectedSexes: Dispatch<SetStateAction<Sex[]>>;
  setSelectedLevels: Dispatch<SetStateAction<Level[]>>;
  filterMembers: (member: Member[]) => Member[];
} => {
  const [selectedSexes, setSelectedSexes] = useState<Sex[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<Level[]>([]);

  const filterMembers = useCallback(
    (members: Member[]) => filter(members, selectedSexes, selectedLevels),
    [selectedLevels, selectedSexes],
  );

  return {
    selectedSexes,
    selectedLevels,
    setSelectedSexes,
    setSelectedLevels,
    filterMembers,
  };
};
