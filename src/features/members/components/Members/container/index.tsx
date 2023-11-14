import { useFilter } from './hooks/useFilter';
import { useMembers } from './hooks/useMembers';
import { useSort } from './hooks/useSort';
import Component from '@/features/members/components/Members/presentation';
import { useMemo, useState } from 'react';

import type { SortKey } from '@/features/members/types/SortKey';
import type { Level, Sex } from '@prisma/client';

const Members = () => {
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const { members, isError, isLoading } = useMembers();
  const { options, selectSortKey, selectedSortKey, sortMembers } = useSort();
  const {
    selectedSexes,
    selectedLevels,
    selectSexes,
    selectLevels,
    filterMembers,
  } = useFilter();

  const displayMembers = useMemo(() => {
    let _members = members;

    (() => {
      _members = sortMembers(_members);
      _members = filterMembers(_members);
    })();

    return _members;
  }, [filterMembers, members, sortMembers]);

  // if any filter condition is selected and there's no member that should be displayed,
  // render an empty state alternatively.
  const shouldShowEmptyState =
    (selectedSexes.length !== 0 || selectedLevels.length !== 0) &&
    displayMembers.length === 0;

  const handleSortModalToggle = () => {
    setIsSortModalOpen((previousState) => !previousState);
  };
  const handleFilterModalToggle = () => {
    setIsFilterModalOpen((previousState) => !previousState);
  };
  const handleSortFormSubmit = (data: { sortKey: SortKey }) => {
    selectSortKey(data.sortKey);
    setIsSortModalOpen(false);
  };
  const handleFilterFormSubmit = (data: { sexes: Sex[]; levels: Level[] }) => {
    selectSexes(data.sexes);
    selectLevels(data.levels);
    setIsFilterModalOpen(false);
  };

  return (
    <>
      <Component
        isError={isError}
        isLoading={isLoading}
        members={displayMembers}
        options={options}
        selectedSortKey={selectedSortKey}
        selectedSex={selectedSexes}
        selectedLevels={selectedLevels}
        onSortFormSubmit={handleSortFormSubmit}
        onFilterFormSubmit={handleFilterFormSubmit}
        isSortModalOpen={isSortModalOpen}
        isFilterModalOpen={isFilterModalOpen}
        shouldShowEmptyState={shouldShowEmptyState}
        onSortModalToggle={handleSortModalToggle}
        onFilterModalToggle={handleFilterModalToggle}
      />
    </>
  );
};

export default Members;
