import { useMembers } from './hooks/useMembers';
import useSort from './hooks/useSort';
import Component from '../presentation';
import { useState } from 'react';

const Members = () => {
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const { members, isError, isLoading } = useMembers();
  const { options } = useSort();

  const handleSortModalToggle = () => {
    setIsSortModalOpen((previousState) => !previousState);
  };

  return (
    <>
      <Component
        isError={isError}
        isLoading={isLoading}
        members={members}
        options={options}
        isSortModalOpen={isSortModalOpen}
        onSortModalToggle={handleSortModalToggle}
      />
    </>
  );
};

export default Members;
