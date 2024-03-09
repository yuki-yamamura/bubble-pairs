import PublishedActivityDetail from '@/features/activities/components/PublishedActivityDetail';

import type { Activity } from '@/types/models/Activity';

type Props = {
  activity: Activity;
};

const PublishedActivityDetailScreen = ({ activity }: Props) => (
  <div className="mx-auto w-full max-w-screen-md pb-20 sm:px-10">
    <PublishedActivityDetail activity={activity} />
  </div>
);

export default PublishedActivityDetailScreen;
