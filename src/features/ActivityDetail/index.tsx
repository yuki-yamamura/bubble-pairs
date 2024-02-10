import GameTable from './GameTable';
import { useActivities } from '../activities/hooks/useActivities';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

import type { Game } from '@/types/models/Game';

const ActivityDetail = () => {
  const router = useRouter();
  const { activityId } = router.query;
  const { activities, mutate } = useActivities();
  const activity = activities?.find((activity) => activity.id === activityId);

  if (!activity) {
    throw new Error();
  }

  const deleteGame = async (gameId: Game['id']) => {
    await axios.delete(`/api/activities/${activity.id}/games/${gameId}`);
    await mutate();
    toast.success('ゲームを削除しました。');
  };

  const openGame = async (gameId: Game['id']) => {
    await router.push(`/activities/${activity.id}/games/${gameId}`);
  };

  return (
    <div>
      <Button asChild>
        <Link href={`/activities/${activity.id}/games/new`}>
          ゲームをはじめる
        </Link>
      </Button>
      <GameTable
        actions={{ deleteGame, openGame }}
        data={
          activities?.find((value) => value.id === activity.id)?.games ?? []
        }
      />
    </div>
  );
};

export default ActivityDetail;
