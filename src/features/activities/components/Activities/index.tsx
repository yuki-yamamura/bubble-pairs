import Loading from '@/components/Loading';
import { Button } from '@/components/ui/button';
import ActivityTable from '@/features/activities/components/ActivityTable';
import { useActivities } from '@/features/activities/hooks/useActivities';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

const Activities = () => {
  const router = useRouter();
  const { activities, isLoading, mutate } = useActivities();

  const closeActivity = async (id: number) => {
    await axios.put(`/api/activities/${id}`, {
      isOpen: false,
    });
    toast.success('アクティビティを終了しました。');
  };

  const deleteActivity = async (id: number) => {
    await axios.delete(`/api/activities/${id}`);
    await mutate();
    toast.success('アクティビティを削除しました。');
  };

  const openActivity = async (id: number) => {
    await router.push(`/activities/${id}`);
  };

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
      <ActivityTable
        data={activities}
        actions={{
          closeActivity,
          deleteActivity,
          openActivity,
        }}
      />
    </div>
  );
};

export default Activities;
