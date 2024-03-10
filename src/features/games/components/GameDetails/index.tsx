import Pair from './Pair';
import Player from './Player';
import { Card, CardContent } from '@/components/ui/card';
import { ruleMap } from '@/constants';
import { cn } from '@/lib/shadcn-ui';
import { Rule } from '@prisma/client';
import { Nunito } from 'next/font/google';

import type { GameDetail } from '@/types/models/GameDetail';

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
});

type Props = {
  gameDetails: GameDetail[];
};

const GameDetails = ({ gameDetails }: Props) => (
  <div className="grid gap-y-4 md:gap-y-6">
    {gameDetails.map(({ id, courtNumber, rule, players }) => (
      <Card key={id}>
        <CardContent className="flex flex-col pt-4">
          <header className="mb-4">
            <div>{`第 ${courtNumber} コート`}</div>
            <div className="pt-1 text-xs text-muted-foreground">{`${ruleMap.get(rule) as string}`}</div>
          </header>
          <div className="flex items-center justify-evenly">
            {/* on the left side */}
            <div className="flex w-5/12 justify-center">
              {rule === Rule.SINGLES ? (
                <Player player={players[0]} />
              ) : (
                <Pair players={[players[0], players[1]]} />
              )}
            </div>
            <div className={cn('w-2/12 text-center', nunito.className)}>VS</div>
            {/* on the right side */}
            <div className="flex w-5/12 justify-center">
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
);

export default GameDetails;
