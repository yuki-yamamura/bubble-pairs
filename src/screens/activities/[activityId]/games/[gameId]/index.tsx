import GameDetail from '@/features/games/components/GameDetail';

import type { Game } from '@/types/models/Game';

type Props = {
  game: Game;
};
const GameDetailScreen = ({ game }: Props) => <GameDetail game={game} />;

export default GameDetailScreen;
