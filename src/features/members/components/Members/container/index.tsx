import { useFilter } from './hooks/useFilter';
import { useMembers } from './hooks/useMembers';
import { useSort } from './hooks/useSort';
import Component from '@/features/members/components/Members/presentation';
import { useRouter } from 'next/router';
import { useMemo, useRef } from 'react';

const Members = () => {
  const { members, isError, isLoading } = useMembers();
  const { selectedSortKey, setSelectedSortKey, sortMembers } = useSort();
  const {
    selectedSexes,
    selectedLevels,
    setSelectedSexes,
    setSelectedLevels,
    filterMembers,
  } = useFilter();
  const router = useRouter();
  const filterModalDialogRef = useRef<HTMLDialogElement>(null);
  const sortModalDialogRef = useRef<HTMLDialogElement>(null);

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

  const toggleSortModal = () => {
    const dialog = sortModalDialogRef.current;
    if (!dialog) return;
    if (dialog.open) {
      dialog.close();
    } else {
      dialog.showModal();
    }
  };
  const handleFilterModalToggle = () => {
    filterModalDialogRef.current?.showModal();
  };
  // const handleFilterFormSubmit = (data: { sexes: Sex[]; levels: Level[] }) => {
  //   selectSexes(data.sexes);
  //   selectLevels(data.levels);
  //   setIsFilterModalOpen(false);
  // };
  const handleNewMemberButtonClick = () => {
    void router.push('/members/new');
  };

  return (
    <Component
      isError={isError}
      isLoading={isLoading}
      members={displayMembers}
      selectedSortKey={selectedSortKey}
      selectedSexes={selectedSexes}
      selectedLevels={selectedLevels}
      setSelectedSortKey={setSelectedSortKey}
      setSelectedSexes={setSelectedSexes}
      setSelectedLevels={setSelectedLevels}
      toggleSortModal={toggleSortModal}
      shouldShowEmptyState={shouldShowEmptyState}
      onFilterModalToggle={handleFilterModalToggle}
      onClickNewMemberButton={handleNewMemberButtonClick}
      filterModalDialogRef={filterModalDialogRef}
      sortModalDialogRef={sortModalDialogRef}
    />
  );
};

export default Members;
