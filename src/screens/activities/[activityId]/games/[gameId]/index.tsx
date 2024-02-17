import PageContainer from '@/components/PageContainer';
import GameDetail from '@/features/games/components/GameDetail';

import type { Game } from '@/types/models/Game';

type Props = {
  game: Game;
};
const GameDetailScreen = ({ game }: Props) => (
  <PageContainer>
    <GameDetail game={game} />
  </PageContainer>
);

export default GameDetailScreen;
