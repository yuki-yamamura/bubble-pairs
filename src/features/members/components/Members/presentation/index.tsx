import NewMemberButton from '../../NewMemberButton';
import FunctionButton from '@/features/members/components/FunctionButton';
import MemberList from '@/features/members/components/MemberList';
import FilterModal from '@/features/members/components/modals/FilterModal';
import SortModal from '@/features/members/components/modals/SortModal';
import { forwardRef } from 'react';
import { MdFilterAlt, MdSort } from 'react-icons/md';

import type { Inputs as FilterFormInputs } from '@/features/members/components/modals/FilterModal';
import type { FormValues } from '@/features/members/components/modals/SortModal';
import type { SortKey } from '@/features/members/types/SortKey';
import type { Option } from '@/types/Option';
import type { Level, Member, Sex } from '@prisma/client';
import type { SubmitHandler } from 'react-hook-form';

import styles from './index.module.scss';

type Props = {
  isError: boolean;
  isLoading: boolean;
  members: Member[];
  options: Option[];
  initialSortKey: SortKey;
  selectedSortKey: SortKey;
  selectedSex: Sex[];
  selectedLevels: Level[];
  onFilterFormSubmit: SubmitHandler<FilterFormInputs>;
  onSortModalSubmit: SubmitHandler<FormValues>;
  isFilterModalOpen: boolean;
  shouldShowEmptyState: boolean;
  selectSortKey: (sortKey: SortKey) => void;
  toggleSortModal: () => void;
  onFilterModalToggle: () => void;
  onClickNewMemberButton: () => void;
};
const Component = forwardRef<HTMLDialogElement, Props>(
  function MembersComponent(
    {
      isError,
      isLoading,
      members,
      options,
      initialSortKey,
      selectedSortKey,
      selectedSex,
      selectedLevels,
      onFilterFormSubmit,
      selectSortKey,
      toggleSortModal,
      isFilterModalOpen,
      shouldShowEmptyState,
      onFilterModalToggle,
      onClickNewMemberButton,
    }: Props,
    ref,
  ) {
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
            isActive={selectedSex.length !== 0 || selectedLevels.length !== 0}
            onClick={onFilterModalToggle}
          />
        </div>
        {shouldShowEmptyState ? (
          <div>該当するメンバーがいません。</div>
        ) : (
          <MemberList members={members} />
        )}
        <SortModal
          title="並び替え"
          description="選択したキーの昇順にメンバーを並び替えます。"
          options={options}
          initialSortKey={initialSortKey}
          selectSortKey={selectSortKey}
          closeModal={toggleSortModal}
          ref={ref}
        />
        {isFilterModalOpen && (
          <FilterModal
            title="絞り込み"
            selectedSex={selectedSex}
            selectedLevel={selectedLevels}
            onSubmit={onFilterFormSubmit}
            onCloseButtonClick={onFilterModalToggle}
          />
        )}
        <div className={styles.buttonContainer}>
          <NewMemberButton onClick={onClickNewMemberButton} />
        </div>
      </div>
    );
  },
);

export default Component;
