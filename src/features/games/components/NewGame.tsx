import Loading from '@/components/Loading';
import GameForm from '@/features/games/components/GameForm';
import axios from 'axios';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import useSWRMutation from 'swr/mutation';

import type { GameCreateSchemaType } from '../validation';
import type { PostResponseData } from '@/pages/api/activities/[activityId]/games';
import type { Activity } from '@/types/models/Activity';

type Props = {
  activity: Activity;
};

const NewGame = ({ activity }: Props) => {
  const router = useRouter();
  const { trigger, isMutating } = useSWRMutation(
    `/api/activities/${activity.id}/games`,
    (url: string, { arg }: { arg: GameCreateSchemaType }) => {
      return axios
        .post<PostResponseData>(url, arg)
        .then((response) => response.data);
    },
  );

  const handleSubmit = (fieldValues: GameCreateSchemaType) => {
    trigger(fieldValues)
      .then(() => {
        toast.success('ゲームを追加しました。');
        void router.push(`/activities/${activity.id}`);
      })
      .catch(() => toast.error('ゲームの追加に失敗しました'));
  };

  if (isMutating) {
    return <Loading />;
  }

  return <GameForm activity={activity} onSubmit={handleSubmit} />;
};

export default NewGame;
