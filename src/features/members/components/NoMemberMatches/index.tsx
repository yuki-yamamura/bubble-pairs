import EmptyState from '@/components/EmptyState';

const NoMemberMatches = () => (
  <EmptyState image="/images/empty-box.png" alt="no members">
    <div>条件に該当するメンバーが見つかりませんでした。</div>
  </EmptyState>
);

export default NoMemberMatches;
