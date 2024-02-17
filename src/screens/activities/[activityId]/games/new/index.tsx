import PageContainer from '@/components/PageContainer';
import NewGame from '@/features/games/components/NewGame';

import type { Activity } from '@/types/models/Activity';

type Props = {
  activity: Activity;
};

const NewGameScreen = ({ activity }: Props) => (
  <PageContainer>
    <NewGame activity={activity} />
  </PageContainer>
);

export default NewGameScreen;
