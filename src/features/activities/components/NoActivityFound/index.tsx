import EmptyState from '@/components/EmptyState';

const NoActivityFound = () => (
  <EmptyState image="/images/calendar.png" alt="no activities">
    <div>アクティビティを開始して、ゲームをはじめましょう。</div>
  </EmptyState>
);

export default NoActivityFound;
