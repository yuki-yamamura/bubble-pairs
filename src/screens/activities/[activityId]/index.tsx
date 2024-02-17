import ActivityDetail from '@/features/activities/components/ActivityDetail';

import type { Activity } from '@/types/models/Activity';

type Props = {
  activity: Activity;
};

const ActivityDetailScreen = ({ activity }: Props) => (
  <div>
    <ActivityDetail activity={activity} />
  </div>
);

export default ActivityDetailScreen;
