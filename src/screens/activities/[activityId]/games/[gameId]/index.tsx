import PageContainer from '@/components/PageContainer';
import GameDetail from '@/features/games/components/GameDetail';

import type { Activity } from '@/types/models/Activity';
import type { Game } from '@/types/models/Game';

type Props = {
  activity: Activity;
  game: Game;
};
const GameDetailScreen = ({ activity, game }: Props) => (
  <PageContainer title="Games">
    <GameDetail activity={activity} game={game} />
  </PageContainer>
);

export default GameDetailScreen;
