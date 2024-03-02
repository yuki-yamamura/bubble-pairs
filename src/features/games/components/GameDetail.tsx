import { Card, CardContent } from '@/components/ui/card';
import { ruleMap } from '@/constants';
import DecoratedMember from '@/features/members/components/DecoratedMember';
import { cn } from '@/lib/shadcn-ui';
import { Rule } from '@prisma/client';
import { Nunito } from 'next/font/google';

import type { Activity } from '@/types/models/Activity';
import type { Game } from '@/types/models/Game';

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

  return (
    <div>
      <h2 className="mb-4">{`${gameNumber} 試合目`}</h2>
      <div className="grid gap-x-4">
        {game.gameDetails.map(({ id, courtNumber, rule, players }) => (
          <Card key={id}>
            <CardContent className="flex flex-col pt-4">
              <header className="mb-4">
                <div>{`第 ${courtNumber} コート`}</div>
                <div className="pt-1 text-xs text-slate-400">{`${ruleMap.get(rule) as string}`}</div>
              </header>
              <div className="flex items-center justify-evenly">
                {/* left side players */}
                <div className="w-5/12 md:w-auto">
                  {rule === Rule.SINGLES ? (
                    <div className="flex items-center gap-x-4">
                      <DecoratedMember member={players[0].participant.member} />
                    </div>
                  ) : (
                    <div className="flex flex-col gap-y-2">
                      {players.slice(0, 2).map((player) => (
                        <DecoratedMember
                          key={player.id}
                          member={player.participant.member}
                        />
                      ))}
                    </div>
                  )}
                </div>
                <div
                  className={cn(
                    'w-2/12 text-center text-sm md:w-auto',
                    nunito.className,
                  )}
                >
                  VS
                </div>
                <div className="w-5/12 md:w-auto">
                  {/* right side players */}
                  {rule === Rule.SINGLES ? (
                    <div className="flex items-center gap-x-4">
                      <DecoratedMember member={players[1].participant.member} />
                    </div>
                  ) : (
                    <div className="flex flex-col gap-y-2">
                      {players.slice(2, 4).map((player) => (
                        <DecoratedMember
                          key={player.id}
                          member={player.participant.member}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GameDetail;
