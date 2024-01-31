import NewGameButton from '@/features/games/components/NewGameButton';
import NoGameFound from '@/features/games/components/NoGameFound';

const ActivityScreen = () => (
  <div>
    <div>
      <NoGameFound />
      <NewGameButton />
    </div>
  </div>
);

export default ActivityScreen;
