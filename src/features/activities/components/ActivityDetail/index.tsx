import { useActivities } from '@/features/activities/hooks/useActivities';
import GameTable from '@/features/games/components/GameTable';
import axios from 'axios';
import router from 'next/router';
import toast from 'react-hot-toast';

import type { Activity } from '@/types/models/Activity';
import type { Game } from '@/types/models/Game';

type Props = {
  activity: Activity;
};

const ActivityDetail = ({ activity }: Props) => {
  const { mutate } = useActivities();

  const deleteGameById = async (gameId: Game['id']) => {
    await axios.delete(`/api/activities/${activity.id}/games/${gameId}`);
    await mutate();
    toast.success('ゲームを削除しました。');
  };
  const openGame = async (gameId: Game['id']) => {
    await router.push(`/activities/${activity.id}/games/${gameId}`);
  };

  return (
    <div>
      <GameTable
        actions={{ deleteGameById, openGame }}
        data={activity?.games ?? []}
      />
    </div>
  );
};

export default ActivityDetail;
