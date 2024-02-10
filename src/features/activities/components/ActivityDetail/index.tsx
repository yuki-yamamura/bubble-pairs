import GameTable from './GameTable';
import { useActivities } from '../../hooks/useActivities';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import Link from 'next/link';
import router from 'next/router';
import toast from 'react-hot-toast';

import type { Activity } from '@/types/models/Activity';
import type { Game } from '@/types/models/Game';

type Props = {
  activity: Activity;
};

const ActivityDetail = ({ activity: { id } }: Props) => {
  const { activities, mutate } = useActivities();
  const activity = activities?.find((activity) => activity.id === id);

  const deleteGame = async (gameId: Game['id']) => {
    await axios.delete(`/api/activities/${id}/games/${gameId}`);
    await mutate();
    toast.success('ゲームを削除しました。');
  };

  const openGame = async (gameId: Game['id']) => {
    await router.push(`/activities/${id}/games/${gameId}`);
  };

  return (
    <div>
      <Button asChild>
        <Link href={`/activities/${id}/games/new`}>ゲームをはじめる</Link>
      </Button>
      <GameTable
        actions={{ deleteGame, openGame }}
        data={activity?.games ?? []}
      />
    </div>
  );
};

export default ActivityDetail;
