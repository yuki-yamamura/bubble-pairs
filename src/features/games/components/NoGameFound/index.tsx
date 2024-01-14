import EmptyState from '@/components/EmptyState';

const NoGameFound = () => (
  <EmptyState image="/images/playing-cards.png" alt="no games">
    <div>ゲームをはじめましょう。</div>
  </EmptyState>
);

export default NoGameFound;
