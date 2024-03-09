import EmptyState from '@/components/EmptyState';
import GameDetail from '@/features/games/components/GameDetail';
import dayjs from 'dayjs';

import type { Activity } from '@/types/models/Activity';

type Props = {
  activity: Activity;
};

const PublishedActivityDetail = ({ activity }: Props) => {
  const { createdAt, games } = activity;
  const formattedDate = dayjs(createdAt).format('YYYY/MM/DD');

  return (
    <div className="flex flex-col">
      <header className="pb-12 pt-8">
        <div className="text-sm text-slate-400">{`開始日: ${formattedDate}`}</div>
      </header>
      {activity.games.length === 0 ? (
        <div className="flex grow items-center justify-center">
          <EmptyState src="/images/empty-box.png" alt="empty-box">
            <div className="text-center leading-7">
              <p>ゲームが開始されていません。</p>
            </div>
          </EmptyState>
        </div>
      ) : (
        <ol className="space-y-12">
          {games.map((game) => (
            <li key={game.id}>
              <GameDetail key={game.id} activity={activity} game={game} />
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default PublishedActivityDetail;
