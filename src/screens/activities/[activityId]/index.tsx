import PageContainer from '@/components/PageContainer';
import ActivityDetail from '@/features/activities/components/ActivityDetail';

import type { Activity } from '@/types/models/Activity';

type Props = {
  activity: Activity;
};

const ActivityDetailScreen = ({ activity }: Props) => (
  <PageContainer title="Activity">
    <ActivityDetail activity={activity} />
  </PageContainer>
);

export default ActivityDetailScreen;
