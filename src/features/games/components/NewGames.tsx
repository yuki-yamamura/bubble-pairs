import Loading from '@/components/Loading';
import { useActivity } from '@/features/activities/hooks/useActivity';
import GamesForm from '@/features/games/components/GamesForm';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import useSWRMutation from 'swr/mutation';

import type { GameCreateSchema } from '@/features/games/validation';
import type { PostResponseData } from '@/types/api/games';

const NewGames = () => {
  const router = useRouter();
  const params = useParams();
  const activityId = params.activityId as string;
  const { activity, isLoading, mutate } = useActivity(activityId);
  const { trigger, isMutating } = useSWRMutation(
    `/api/activities/${activityId}/games`,
    (url: string, { arg }: { arg: GameCreateSchema }) => {
      return axios
        .post<PostResponseData>(url, arg)
        .then((response) => response.data);
    },
  );

  const handleSubmit = async (fieldValues: GameCreateSchema) => {
    try {
      await trigger(fieldValues);
      await router.push(`/activities/${activityId}`);
      await mutate();
      toast.success('試合を追加しました。');
    } catch {
      toast.error('試合の追加に失敗しました');
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!activity) {
    void router.push('/404');

    return null;
  }

  return (
    <GamesForm
      activity={activity}
      isSubmitting={isMutating}
      onSubmit={handleSubmit}
    />
  );
};

export default NewGames;
