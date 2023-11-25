import NewMemberButton from '../../NewMemberButton';
import FunctionButton from '@/features/members/components/FunctionButton';
import MemberList from '@/features/members/components/MemberList';
import FilterModal from '@/features/members/components/modals/FilterModal';
import SortModal from '@/features/members/components/modals/SortModal';
import { MdFilterAlt, MdSort } from 'react-icons/md';

import type { SortKey } from '@/features/members/types/SortKey';
import type { Level, Member, Sex } from '@prisma/client';
import type { Dispatch, RefObject, SetStateAction } from 'react';

import styles from './index.module.scss';

type Props = {
  isError: boolean;
  isLoading: boolean;
  members: Member[];
  selectedSortKey: SortKey;
  selectedSexes: Sex[];
  selectedLevels: Level[];
  shouldShowEmptyState: boolean;
  setSelectedSortKey: Dispatch<SetStateAction<SortKey>>;
  setSelectedSexes: Dispatch<SetStateAction<Sex[]>>;
  setSelectedLevels: Dispatch<SetStateAction<Level[]>>;
  toggleSortModal: () => void;
  onFilterModalToggle: () => void;
  onClickNewMemberButton: () => void;
  filterModalDialogRef: RefObject<HTMLDialogElement>;
  sortModalDialogRef: RefObject<HTMLDialogElement>;
};
const Component = ({
  isError,
  isLoading,
  members,
  selectedSortKey,
  selectedSexes,
  selectedLevels,
  setSelectedSortKey,
  setSelectedSexes,
  setSelectedLevels,
  toggleSortModal,
  shouldShowEmptyState,
  onFilterModalToggle,
  onClickNewMemberButton,
  filterModalDialogRef,
  sortModalDialogRef,
}: Props) => {
  if (isLoading) {
    return <div>Loading members...</div>;
  }

  if (isError) {
    return <div>Something went wrong.</div>;
  }

  return (
    <div className={styles.module}>
      <div className={styles.buttons}>
        <FunctionButton
          label="並び替え"
          Icon={MdSort}
          isActive={selectedSortKey !== 'createdAt'}
          onClick={toggleSortModal}
        />
        <FunctionButton
          label="絞り込み"
          Icon={MdFilterAlt}
          isActive={selectedSexes.length !== 0 || selectedLevels.length !== 0}
          onClick={onFilterModalToggle}
        />
      </div>
      {shouldShowEmptyState ? (
        <div>該当するメンバーがいません。</div>
      ) : (
        <MemberList members={members} />
      )}
      <SortModal
        setSelectedSortKey={setSelectedSortKey}
        dialogRef={sortModalDialogRef}
      />
      <FilterModal
        setSelectedSexes={setSelectedSexes}
        setSelectedLevels={setSelectedLevels}
        dialogRef={filterModalDialogRef}
      />
      <div className={styles.buttonContainer}>
        <NewMemberButton onClick={onClickNewMemberButton} />
      </div>
    </div>
  );
};

export default Component;
