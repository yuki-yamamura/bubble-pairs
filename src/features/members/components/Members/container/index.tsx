import Component from '../presenter';
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

  const isFilterEnabled =
    filter.levels.length !== 0 || filter.sexes.length !== 0;
  const isSortEnabled = sort.sortKey !== 'createdAt';
  const shouldShowEmptyState = !isFilterEnabled && members.length === 0;

  const handleNewMemberButtonClick = () => {
    void router.push('/members/new');
  };

  return (
    <Component
      members={members}
      isLoading={isLoading}
      isError={isError}
      isFilterEnabled={isFilterEnabled}
      isSortEnabled={isSortEnabled}
      shouldShowEmptyState={shouldShowEmptyState}
      onNewMemberButtonClick={handleNewMemberButtonClick}
      filter={filter}
      sort={sort}
      onFilterChange={onFilterChange}
      onSortChange={onSortChange}
    />
  );
};

export default Members;
