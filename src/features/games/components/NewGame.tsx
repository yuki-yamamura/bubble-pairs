import GameForm from '@/features/games/components/GameForm';
import axios from 'axios';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import useSWRMutation from 'swr/mutation';

import type { GameCreateSchema } from '@/features/games/validation';
import type { PostResponseData } from '@/types/api/games';
import type { Activity } from '@/types/models/Activity';

type Props = {
  activity: Activity;
};

const NewGame = ({ activity }: Props) => {
  const router = useRouter();
  const { trigger, isMutating } = useSWRMutation(
    `/api/activities/${activity.id}/games`,
    (url: string, { arg }: { arg: GameCreateSchema }) => {
      return axios
        .post<PostResponseData>(url, arg)
        .then((response) => response.data);
    },
  );

  const handleSubmit = async (fieldValues: GameCreateSchema) => {
    try {
      await trigger(fieldValues);
      await router.push(`/activities/${activity.id}`);
      toast.success('ゲームを追加しました。');
    } catch {
      toast.error('ゲームの追加に失敗しました');
    }
  };

  return (
    <GameForm
      activity={activity}
      isSubmitting={isMutating}
      onSubmit={handleSubmit}
    />
  );
};

export default NewGame;
