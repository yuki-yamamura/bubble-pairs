import SortModal from '@/features/members/components//SortModal';
import FilterModal from '@/features/members/components/FilterModal';
import MemberList from '@/features/members/components/MemberList';
import NewMemberButton from '@/features/members/components/NewMemberButton';
import NoMemberFound from '@/features/members/components/NoMemberFound';
import NoMemberMatches from '@/features/members/components/NoMemberMatches';

import type { MemberFilter, MemberSort } from '@/features/members/validation';
import type { Member } from '@prisma/client';

import styles from './index.module.scss';

type Props = {
  members: Member[];
  isError: boolean;
  isLoading: boolean;
  isFilterActive: boolean;
  isSortActive: boolean;
  shouldShowEmptyState: boolean;
  onNewMemberButtonClick: () => void;
  filter: MemberFilter;
  sort: MemberSort;
  onFilterChange: (filter: MemberFilter) => void;
  onSortChange: (sort: MemberSort) => void;
};
const Component = ({
  members,
  isError,
  isLoading,
  isFilterActive,
  isSortActive,
  shouldShowEmptyState,
  onNewMemberButtonClick,
  filter,
  sort,
  onFilterChange,
  onSortChange,
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
        <FilterModal
          isFilterActive={isFilterActive}
          defaultValues={filter}
          onSubmit={onFilterChange}
        />
        <SortModal
          isSortActive={isSortActive}
          defaultValues={sort}
          onSubmit={onSortChange}
        />
      </div>
      {shouldShowEmptyState ? (
        <NoMemberMatches />
      ) : members.length === 0 ? (
        <NoMemberFound />
      ) : (
        <MemberList members={members} />
      )}
      <div className={styles.buttonContainer}>
        <NewMemberButton onClick={onNewMemberButtonClick} />
      </div>
    </div>
  );
};

export default Component;
