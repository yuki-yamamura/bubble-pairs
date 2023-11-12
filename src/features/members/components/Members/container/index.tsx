import { useMembers } from './hooks/useMembers';
import useSort from './hooks/useSort';
import Component from '@/features/members/components/Members/presentation';
import { useState } from 'react';

import type { SortKey } from '@/features/members/types/SortKey';

const Members = () => {
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const { members, isError, isLoading } = useMembers();
  const { options, selectSortKey, selectedSortKey, sortMembers } = useSort();

  const sortedMembers = sortMembers(members, selectedSortKey);

  const handleSortModalToggle = () => {
    setIsSortModalOpen((previousState) => !previousState);
  };

  const handleSubmit = (data: { sortKey: SortKey }) => {
    selectSortKey(data.sortKey);
    setIsSortModalOpen(false);
  };

  return (
    <>
      <Component
        isError={isError}
        isLoading={isLoading}
        members={sortedMembers}
        options={options}
        selectedSortKey={selectedSortKey}
        onSubmit={handleSubmit}
        isSortModalOpen={isSortModalOpen}
        onSortModalToggle={handleSortModalToggle}
      />
    </>
  );
};

export default Members;
