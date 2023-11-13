import { filterMembers as filter } from './filterMembers';
import { useCallback, useState } from 'react';

import type { Level, Member, Sex } from '@prisma/client';

export const useFilter = (): {
  selectedSexes: Sex[];
  selectedLevels: Level[];
  selectSexes: (sexes: Sex[]) => void;
  selectLevels: (levels: Level[]) => void;
  filterMembers: (member: Member[]) => Member[];
} => {
  const [selectedSexes, setSelectedSexes] = useState<Sex[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<Level[]>([]);

  const selectSexes = useCallback(
    (sexes: Sex[]) => setSelectedSexes(sexes),
    [],
  );
  const selectLevels = useCallback(
    (levels: Level[]) => setSelectedLevels(levels),
    [],
  );

  const filterMembers = useCallback(
    (members: Member[]) => filter(members, selectedSexes, selectedLevels),
    [selectedLevels, selectedSexes],
  );

  return {
    selectedSexes,
    selectedLevels,
    selectSexes,
    selectLevels,
    filterMembers,
  };
};
