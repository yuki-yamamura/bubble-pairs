import ActivityTable from '../ActivityTable';
import Loading from '@/components/Loading';
import { useActivities } from '@/features/activities/hooks/useActivities';

const Activities = () => {
  const { activities, isLoading } = useActivities();

  if (isLoading) {
    return <Loading />;
  }

  if (!activities) {
    return <div>something went wrong</div>;
  }

  return <ActivityTable activities={activities} />;
};

export default Activities;
