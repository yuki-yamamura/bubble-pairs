import EmptyState from '@/components/EmptyState';
import Loading from '@/components/Loading';
import PlusButton from '@/components/PlusButton';
import { Badge } from '@/components/ui/badge';
import ParticipantTable from '@/features/activities/components/ParticipantTable';
import { useActivity } from '@/features/activities/hooks/useActivity';
import GameTable from '@/features/games/components/GameTable';
import { cn } from '@/lib/shadcn-ui';
import axios from 'axios';
import dayjs from 'dayjs';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

import type { Game } from '@/types/models/Game';

const ActivityDetail = () => {
  const router = useRouter();
  const params = useParams();
  const activityId = params.activityId as string;
  const { activity, isLoading, mutate } = useActivity(activityId);

  const handlePlusButtonClick = async () => {
    await router.push(`/activities/${activityId}/games/new`);
  };

  const deleteGameById = async (gameId: Game['id']) => {
    try {
      await axios.delete(`/api/activities/${activityId}/games/${gameId}`);
      await mutate();
      toast.success('ゲームを削除しました。');
    } catch {
      toast.error('ゲームを削除できませんでした。');
    }
  };
  const openGame = async (gameId: Game['id']) => {
    await router.push(`/activities/${activityId}/games/${gameId}`);
  };

  const formattedDate = dayjs(activity?.createdAt).format('YYYY/MM/DD');

  if (isLoading) {
    return <Loading />;
  }

  if (!activity) {
    void router.push('/404');

    return null;
  }

  return (
    <div className="flex flex-col gap-y-16">
      {activity.isOpen && <PlusButton onClick={handlePlusButtonClick} />}
      <header className="flex flex-col gap-y-4">
        <div className="text-sm text-slate-400">{`開始日: ${formattedDate}`}</div>
        <Badge
          className={cn(
            'max-w-fit',
            activity.isOpen
              ? 'border-primary-green-foreground bg-primary-green text-primary-green-foreground hover:bg-primary-green hover:text-primary-green-foreground'
              : 'border-purple-400 bg-primary-foreground text-purple-400 hover:bg-primary-foreground hover:text-purple-400',
          )}
        >
          {activity.isOpen ? 'Open' : 'Closed'}
        </Badge>
      </header>
      <section id="games">
        {activity.games.length === 0 ? (
          <EmptyState src="/images/playing-cards.png" alt="playing-cards">
            <div className="text-center leading-7">
              <p>ゲームをはじめましょう。</p>
              <p>画面左下にある「+」ボタンを押してください。</p>
            </div>
          </EmptyState>
        ) : (
          <>
            <h2 className="mb-4">ゲーム</h2>
            <GameTable
              actions={[deleteGameById, openGame]}
              data={activity?.games ?? []}
            />
          </>
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
