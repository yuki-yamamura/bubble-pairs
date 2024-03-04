import Pair from './GameDetail/Pair';
import Player from './GameDetail/Player';
import { Card, CardContent } from '@/components/ui/card';
import { ruleMap } from '@/constants';
import ParticipantTable from '@/features/activities/components/ParticipantTable';
import { cn } from '@/lib/shadcn-ui';
import { Rule } from '@prisma/client';
import { Nunito } from 'next/font/google';

import type { Activity } from '@/types/models/Activity';
import type { Game } from '@/types/models/Game';
import type { Participant } from '@/types/models/Participant';

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
});

type Props = {
  activity: Activity;
  game: Game;
};

const GameDetail = ({ activity, game }: Props) => {
  const gameNumber =
    activity.games
      .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
      .findIndex(({ id }) => id === game.id) + 1;
  const resters: Participant[] = game.resters
    .map(({ participantId }) =>
      activity.participants.find(
        (participant) => participant.id === participantId,
      ),
    )
    .filter((participant): participant is Participant => !!participant);

  return (
    <div className="flex flex-col gap-y-16">
      <section id="game-details">
        <h2 className="mb-4">{`${gameNumber} 試合目`}</h2>
        <div className="grid gap-y-4 md:gap-y-6">
          {game.gameDetails.map(({ id, courtNumber, rule, players }) => (
            <Card key={id}>
              <CardContent className="flex flex-col pt-4">
                <header className="mb-4">
                  <div>{`第 ${courtNumber} コート`}</div>
                  <div className="pt-1 text-xs text-muted-foreground">{`${ruleMap.get(rule) as string}`}</div>
                </header>
                <div className="flex items-center justify-evenly">
                  {/* on the left side */}
                  <div className="w-5/12">
                    {rule === Rule.SINGLES ? (
                      <Player player={players[0]} />
                    ) : (
                      <Pair players={[players[0], players[1]]} />
                    )}
                  </div>
                  <div className={cn('w-2/12 text-center', nunito.className)}>
                    VS
                  </div>
                  {/* on the right side */}
                  <div className="w-5/12">
                    {rule === Rule.SINGLES ? (
                      <Player player={players[1]} />
                    ) : (
                      <Pair players={[players[2], players[3]]} />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      {resters.length !== 0 && (
        <section id="resters">
          <h2 className="mb-4">休憩</h2>
          <ParticipantTable data={resters} />
        </section>
      )}
    </div>
  );
};

export default GameDetail;
