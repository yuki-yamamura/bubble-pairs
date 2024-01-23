import GameForm from '@/features/games/components/GameForm';

import type { Activity } from '@/types/models/Activity';

type Props = {
  activity: Activity;
};

const NewGamesScreen = ({ activity }: Props) => (
  <GameForm activity={activity} />
);

export default NewGamesScreen;
