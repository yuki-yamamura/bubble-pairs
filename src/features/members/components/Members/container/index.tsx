import { useFilter } from '../hooks/useFilter';
import { useSort } from '../hooks/useSort';
import Component from '../presenter';
import { useMembers } from '@/features/members/hooks/useMembers';
import { useRouter } from 'next/router';
import { useMemo, useRef } from 'react';

const Members = () => {
  const { members, isError, isLoading } = useMembers();
  const {
    levelOptions,
    sexOptions,
    selectedSexes,
    selectedLevels,
    setSelectedSexes,
    setSelectedLevels,
    filterMembers,
  } = useFilter();
  const { sortKeyOptions, selectedSortKey, setSelectedSortKey, sortMembers } =
    useSort();

  const router = useRouter();
  const filterModalRef = useRef<HTMLDialogElement>(null);
  const sortModalRef = useRef<HTMLDialogElement>(null);

  const displayMembers = useMemo(() => {
    let _members = members;

    (() => {
      _members = sortMembers(_members);
      _members = filterMembers(_members);
    })();

    return _members;
  }, [filterMembers, members, sortMembers]);

  const isFilterEnabled =
    selectedSexes.length !== 0 || selectedLevels.length !== 0;
  const isSortEnabled = selectedSortKey !== sortKeyOptions[0].value;
  // if any filter conditions are selected and there's no member that should be displayed,
  // render an empty state alternatively.
  const shouldShowEmptyState =
    (selectedSexes.length !== 0 || selectedLevels.length !== 0) &&
    displayMembers.length === 0;

  const openFilterModal = () => {
    const dialog = filterModalRef.current;
    if (!dialog || dialog.open) return;

    dialog.showModal();
  };
  const openSortModal = () => {
    const dialog = sortModalRef.current;
    if (!dialog || dialog.open) return;

    dialog.showModal();
  };
  const handleNewMemberButtonClick = () => {
    void router.push('/members/new');
  };

  return (
    <Component
      members={displayMembers}
      isLoading={isLoading}
      isError={isError}
      isFilterEnabled={isFilterEnabled}
      isSortEnabled={isSortEnabled}
      shouldShowEmptyState={shouldShowEmptyState}
      setSelectedLevels={setSelectedLevels}
      setSelectedSexes={setSelectedSexes}
      setSelectedSortKey={setSelectedSortKey}
      onNewMemberButtonClick={handleNewMemberButtonClick}
      openFilterModal={openFilterModal}
      openSortModal={openSortModal}
      levelOptions={levelOptions}
      sexOptions={sexOptions}
      sortKeyOptions={sortKeyOptions}
      filterModalRef={filterModalRef}
      sortModalRef={sortModalRef}
    />
  );
};

export default Members;
