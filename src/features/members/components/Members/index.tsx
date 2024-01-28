import { Button } from '@/components/ui/button';
import SortModal from '@/features/members/components//SortModal';
import FilterModal from '@/features/members/components/FilterModal';
import MemberList from '@/features/members/components/MemberList';
import NoMemberFound from '@/features/members/components/NoMemberFound';
import NoMemberMatches from '@/features/members/components/NoMemberMatches';
import { useMembers } from '@/features/members/hooks/useMembers';
import { useRouter } from 'next/router';

const Members = () => {
  const {
    members,
    isError,
    isLoading,
    filter,
    sort,
    onFilterChange,
    onSortChange,
  } = useMembers();

  const router = useRouter();

  const isFilterActive =
    filter.levels.length !== 0 || filter.sexes.length !== 0;
  const isSortActive = sort.sortKey !== 'createdAt';
  const shouldShowEmptyState = !isFilterActive && members.length === 0;

  const handleNewMemberButtonClick = () => {
    void router.push('/members/new');
  };

  if (isLoading) {
    return <div>メンバーを取得しています。</div>;
  }

  if (isError) {
    return <div>メンバーの取得に失敗しました。</div>;
  }

  return (
    <div className="relative h-full w-full">
      <div className="mb-8 flex gap-x-4">
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
        <Button type="button" onClick={handleNewMemberButtonClick}>
          メンバー追加
        </Button>
      </div>
      {shouldShowEmptyState ? (
        <NoMemberMatches />
      ) : members.length === 0 ? (
        <NoMemberFound />
      ) : (
        <MemberList members={members} />
      )}
    </div>
  );
};

export default Members;
