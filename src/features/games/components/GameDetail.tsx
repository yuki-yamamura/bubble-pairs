import { Card, CardContent } from '@/components/ui/card';
import { ruleMap } from '@/constants';
import DecoratedMember from '@/features/members/components/DecoratedMember';
import { cn } from '@/lib/shadcn-ui';
import { Rule } from '@prisma/client';
import { Nunito } from 'next/font/google';

import type { Game } from '@/types/models/Game';

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
});

type Props = {
  game: Game;
};

const GameDetail = ({ game }: Props) => {
  return (
    <div>
      <div className="grid gap-x-4 md:grid-cols-2">
        {game.gameDetails.map(({ id, courtNumber, rule, players }) => (
          <Card key={id}>
            <CardContent className="pt-4">
              <header className="mb-4">
                <div>{`第 ${courtNumber} コート`}</div>
                <div className="pt-1 text-xs text-slate-400">{`${ruleMap.get(rule) as string}`}</div>
              </header>
              <div className="flex items-center gap-x-4">
                {/* left side players */}
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
                <div
                  className={cn('grow text-center text-sm', nunito.className)}
                >
                  VS
                </div>
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
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GameDetail;
