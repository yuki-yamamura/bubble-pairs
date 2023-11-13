import { filterMembers as filter } from './filterMembers';
import * as options from './options';
import { useCallback, useMemo, useState } from 'react';

import type { Level, Member, Sex } from '@prisma/client';

export const useFilter = (): {
  sexOptions: typeof options.sexOptions;
  levelOptions: typeof options.levelOptions;
  selectedSexes: Sex[];
  selectedLevels: Level[];
  selectSexes: (sexes: Sex[]) => void;
  selectLevels: (levels: Level[]) => void;
  filterMembers: (member: Member[]) => Member[];
} => {
  const sexOptions = useMemo(() => options.sexOptions, []);
  const levelOptions = useMemo(() => options.levelOptions, []);
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
    sexOptions,
    levelOptions,
    selectedSexes,
    selectedLevels,
    selectSexes,
    selectLevels,
    filterMembers,
  };
};
