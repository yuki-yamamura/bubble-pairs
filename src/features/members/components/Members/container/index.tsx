import { useSort } from '../hooks/useSort';
import Component from '../presenter';
import { useMembers } from '@/features/members/hooks/useMembers';
import { useRouter } from 'next/router';
import { useMemo, useRef } from 'react';

const Members = () => {
  const {
    members,
    isError,
    isLoading,
    filter,
    onFilterChange,
    displayMembers,
  } = useMembers();
  const { sortKeyOptions, selectedSortKey, setSelectedSortKey, sortMembers } =
    useSort();

  const router = useRouter();
  const sortModalRef = useRef<HTMLDialogElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const sortedMembers = useMemo(() => {
    let _members = members;

    (() => {
      _members = sortMembers(_members);
    })();

    return _members;
  }, [members, sortMembers]);

  const isFilterEnabled =
    filter.levels.length !== 0 || filter.sexes.length !== 0;

  const isSortEnabled = selectedSortKey !== sortKeyOptions[0].value;
  // if any filter conditions are selected and there's no member that should be displayed,
  // render an empty state alternatively.
  const shouldShowEmptyState = !isFilterEnabled && displayMembers.length === 0;

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
      setSelectedSortKey={setSelectedSortKey}
      onNewMemberButtonClick={handleNewMemberButtonClick}
      openSortModal={openSortModal}
      sortKeyOptions={sortKeyOptions}
      sortModalRef={sortModalRef}
      filter={filter}
      onFilterChange={onFilterChange}
    />
  );
};

export default Members;
