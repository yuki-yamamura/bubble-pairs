import NewGame from '@/features/games/components/NewGame';

import type { Activity } from '@/types/models/Activity';

type Props = {
  activity: Activity;
};

const NewGameScreen = ({ activity }: Props) => <NewGame activity={activity} />;

export default NewGameScreen;
