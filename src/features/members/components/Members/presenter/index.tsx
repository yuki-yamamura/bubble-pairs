import NewMemberButton from '../../NewMemberButton';
import FunctionButton from '@/features/members/components/FunctionButton';
import MemberList from '@/features/members/components/MemberList';
import FilterModal from '@/features/members/components/modals/FilterModal';
import SortModal from '@/features/members/components/modals/SortModal';
import { MdFilterAlt, MdSort } from 'react-icons/md';

import type { SortKey } from '@/features/members/types/SortKey';
import type { Options } from '@/types/Options';
import type { Level, Member, Sex } from '@prisma/client';
import type { Dispatch, RefObject, SetStateAction } from 'react';

import styles from './index.module.scss';

type Props = {
  members: Member[];
  isError: boolean;
  isLoading: boolean;
  isFilterEnabled: boolean;
  isSortEnabled: boolean;
  shouldShowEmptyState: boolean;
  setSelectedLevels: Dispatch<SetStateAction<Level[]>>;
  setSelectedSexes: Dispatch<SetStateAction<Sex[]>>;
  setSelectedSortKey: Dispatch<SetStateAction<SortKey>>;
  onNewMemberButtonClick: () => void;
  openFilterModal: () => void;
  openSortModal: () => void;
  levelOptions: Options<Level>;
  sexOptions: Options<Sex>;
  sortKeyOptions: Options<SortKey>;
  filterModalRef: RefObject<HTMLDialogElement>;
  sortModalRef: RefObject<HTMLDialogElement>;
};
const Component = ({
  members,
  isError,
  isLoading,
  isFilterEnabled,
  isSortEnabled,
  shouldShowEmptyState,
  setSelectedLevels,
  setSelectedSexes,
  setSelectedSortKey,
  onNewMemberButtonClick,
  openFilterModal,
  openSortModal,
  filterModalRef,
  sortModalRef,
  levelOptions,
  sexOptions,
  sortKeyOptions,
}: Props) => {
  if (isLoading) {
    return <div>メンバーを取得しています。</div>;
  }

  if (isError) {
    return <div>メンバーの取得に失敗しました。</div>;
  }

  return (
    <div className={styles.module}>
      <div className={styles.buttons}>
        <FunctionButton
          label="並び替え"
          Icon={MdSort}
          isActive={isSortEnabled}
          onClick={openSortModal}
        />
        <FunctionButton
          label="絞り込み"
          Icon={MdFilterAlt}
          isActive={isFilterEnabled}
          onClick={openFilterModal}
        />
      </div>
      {shouldShowEmptyState ? (
        <div>条件に該当するメンバーがいません。</div>
      ) : (
        <MemberList members={members} />
      )}
      <SortModal
        options={sortKeyOptions}
        setSelectedSortKey={setSelectedSortKey}
        dialogRef={sortModalRef}
      />
      <FilterModal
        levelOptions={levelOptions}
        sexOptions={sexOptions}
        setSelectedSexes={setSelectedSexes}
        setSelectedLevels={setSelectedLevels}
        dialogRef={filterModalRef}
      />
      <div className={styles.buttonContainer}>
        <NewMemberButton onClick={onNewMemberButtonClick} />
      </div>
    </div>
  );
};

export default Component;
