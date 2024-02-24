import ParticipantTable from '../ParticipantTable';
import EmptyState from '@/components/EmptyState';
import PlusButton from '@/components/PlusButton';
import { Badge } from '@/components/ui/badge';
import { useActivities } from '@/features/activities/hooks/useActivities';
import GameTable from '@/features/games/components/GameTable';
import { cn } from '@/lib/shadcn-ui';
import axios from 'axios';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

import type { Activity } from '@/types/models/Activity';
import type { Game } from '@/types/models/Game';

type Props = {
  activity: Activity;
};

const ActivityDetail = ({ activity }: Props) => {
  const router = useRouter();
  const { mutate } = useActivities();

  const handlePlusButtonClick = async () => {
    await router.push(`/activities/${activity.id}/games/new`);
  };

  const deleteGameById = async (gameId: Game['id']) => {
    await axios.delete(`/api/activities/${activity.id}/games/${gameId}`);
    await mutate();
    toast.success('ゲームを削除しました。');
  };
  const openGame = async (gameId: Game['id']) => {
    await router.push(`/activities/${activity.id}/games/${gameId}`);
  };

  return (
    <div className="flex flex-col gap-y-16">
      <PlusButton onClick={handlePlusButtonClick} />
      <header className="flex gap-x-4">
        <div className="text-slate-400">{`開始日: ${dayjs(activity.createdAt).format('YYYY/MM/DD')}`}</div>
        <Badge
          className={cn(
            'max-w-fit',
            activity.isOpen
              ? 'border-primary-green-foreground bg-primary-green text-primary-green-foreground'
              : 'border-purple-400 bg-primary-foreground text-purple-400',
          )}
        >
          {activity.isOpen ? 'Open' : 'Closed'}
        </Badge>
      </header>
      <section id="games">
        <h2 className="mb-4">ゲーム</h2>
        {activity.games.length === 0 ? (
          <EmptyState src="/images/playing-cards.png" alt="playing-cards">
            <div className="text-center leading-7">
              <p>ゲームをはじめましょう。</p>
              <p>右下の「+」ボタンを押してください。</p>
            </div>
          </EmptyState>
        ) : (
          <GameTable
            actions={{ deleteGameById, openGame }}
            data={activity?.games ?? []}
          />
        )}
      </section>
      <section id="participants">
        <h2 className="mb-4">参加者</h2>
        <ParticipantTable data={activity.participants} />
      </section>
    </div>
  );
};

export default ActivityDetail;
