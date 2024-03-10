import PageContainer from '@/components/PageContainer';
import Game from '@/features/games/components/Game';

import type { Activity } from '@/types/models/Activity';
import type { Game as GameType } from '@/types/models/Game';

type Props = {
  activity: Activity;
  game: GameType;
};
const GameDetailScreen = ({ activity, game }: Props) => (
  <PageContainer title="Games">
    <Game activity={activity} game={game} />
  </PageContainer>
);

export default GameDetailScreen;
