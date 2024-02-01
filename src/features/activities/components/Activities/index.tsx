import Loading from '@/components/Loading';
import { Button } from '@/components/ui/button';
import ActivityTable from '@/features/activities/components/ActivityTable';
import { useActivities } from '@/features/activities/hooks/useActivities';
import Link from 'next/link';

const Activities = () => {
  const { activities, isLoading } = useActivities();

  if (isLoading) {
    return <Loading />;
  }

  if (!activities) {
    return <div>something went wrong</div>;
  }

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Button asChild>
          <Link href={'/activities/new'}>アクティビティを追加</Link>
        </Button>
      </div>
      <ActivityTable activities={activities} />
    </div>
  );
};

export default Activities;
