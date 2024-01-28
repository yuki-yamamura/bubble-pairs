import FilterModal from '@/features/members/components/FilterModal';
import FunctionButton from '@/features/members/components/FunctionButton';
import MemberList from '@/features/members/components/MemberList';
import SortModal from '@/features/members/components/modals/SortModal';
import NewMemberButton from '@/features/members/components/NewMemberButton';
import NoMemberFound from '@/features/members/components/NoMemberFound';
import NoMemberMatches from '@/features/members/components/NoMemberMatches';
import { MdSort } from 'react-icons/md';

import type { SortKey } from '@/features/members/types/SortKey';
import type { MemberFilter } from '@/features/members/validation';
import type { Options } from '@/types/Options';
import type { Member } from '@prisma/client';
import type { Dispatch, RefObject, SetStateAction } from 'react';

import styles from './index.module.scss';

type Props = {
  members: Member[];
  isError: boolean;
  isLoading: boolean;
  isFilterEnabled: boolean;
  isSortEnabled: boolean;
  shouldShowEmptyState: boolean;
  setSelectedSortKey: Dispatch<SetStateAction<SortKey>>;
  onNewMemberButtonClick: () => void;
  openSortModal: () => void;
  sortKeyOptions: Options<SortKey>;
  sortModalRef: RefObject<HTMLDialogElement>;
  filter: MemberFilter;
  onFilterChange: (filter: MemberFilter) => void;
};
const Component = ({
  members,
  isError,
  isLoading,
  isFilterEnabled,
  isSortEnabled,
  shouldShowEmptyState,
  setSelectedSortKey,
  onNewMemberButtonClick,
  openSortModal,
  sortModalRef,
  sortKeyOptions,
  filter,
  onFilterChange,
}: Props) => {
  console.log(isFilterEnabled);

  if (isLoading) {
    return <div>メンバーを取得しています。</div>;
  }

  if (isError) {
    return <div>メンバーの取得に失敗しました。</div>;
  }

  return (
    <div className={styles.module}>
      <div className={styles.buttons}>
        <FilterModal defaultValues={filter} onSubmit={onFilterChange} />
        <FunctionButton
          label="並び替え"
          Icon={MdSort}
          isActive={isSortEnabled}
          onClick={openSortModal}
        />
      </div>
      {shouldShowEmptyState ? (
        <NoMemberMatches />
      ) : members.length === 0 ? (
        <NoMemberFound />
      ) : (
        <MemberList members={members} />
      )}
      <SortModal
        options={sortKeyOptions}
        setSelectedSortKey={setSelectedSortKey}
        dialogRef={sortModalRef}
      />
      <div className={styles.buttonContainer}>
        <NewMemberButton onClick={onNewMemberButtonClick} />
      </div>
    </div>
  );
};

export default Component;
