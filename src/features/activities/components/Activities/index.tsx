import Loading from '@/components/Loading';
import { useActivities } from '@/features/activities/hooks/useActivities';

const Activities = () => {
  const { activities, isLoading } = useActivities();

  if (isLoading) {
    <Loading />;
  }

  console.log(activities);

  return (
    <ul>
      {activities &&
        activities.map((activity) => <li key={activity.id}>{activity.id}</li>)}
    </ul>
  );
};

export default Activities;
