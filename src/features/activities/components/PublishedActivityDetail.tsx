import EmptyState from '@/components/EmptyState';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import GameDetails from '@/features/games/components/GameDetails';
import dayjs from 'dayjs';
import { ChevronsUpDownIcon } from 'lucide-react';

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
              <p>試合が開始されていません。</p>
            </div>
          </EmptyState>
        </div>
      ) : (
        <ol className="space-y-12">
          {games.map((game) => {
            const gameNumber =
              activity.games.findIndex(({ id }) => id === game.id) + 1;

            return (
              <li key={game.id}>
                <Collapsible className="text-sm text-muted-foreground">
                  <CollapsibleTrigger asChild>
                    <div className="mb-4 flex items-center gap-x-4">
                      <h2>{`${gameNumber} 試合目`}</h2>
                      <Button variant="ghost" size="sm">
                        <ChevronsUpDownIcon
                          aria-label="show-game-detail"
                          className="h-4 w-4"
                        />
                      </Button>
                    </div>
                  </CollapsibleTrigger>
                  <div className="mb-4 md:mb-6">
                    <GameDetails gameDetails={game.gameDetails.slice(0, 1)} />
                  </div>
                  <CollapsibleContent>
                    <GameDetails gameDetails={game.gameDetails.slice(1)} />
                  </CollapsibleContent>
                </Collapsible>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
};

export default PublishedActivityDetail;
