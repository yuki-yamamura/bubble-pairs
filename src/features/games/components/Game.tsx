import GameDetails from './GameDetails';
import Button from '@/components/Button';
import ParticipantTable from '@/features/activities/components/ParticipantTable';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { useRouter } from 'next/router';

import type { Activity } from '@/types/models/Activity';
import type { Game as GameType } from '@/types/models/Game';
import type { Participant } from '@/types/models/Participant';

type Props = {
  activity: Activity;
  game: GameType;
};

const Game = ({ activity, game }: Props) => {
  const router = useRouter();
  const gameNumber = activity.games.findIndex(({ id }) => id === game.id) + 1;
  const resters: Participant[] = game.resters
    .map(({ participantId }) =>
      activity.participants.find(
        (participant) => participant.id === participantId,
      ),
    )
    .filter((participant): participant is Participant => !!participant);

  const currentGameIndex = activity.games.findIndex(({ id }) => id === game.id);
  const previousGame = activity.games.find(
    (_, index) => index === currentGameIndex - 1,
  );
  const nextGame = activity.games.find(
    (_, index) => index === currentGameIndex + 1,
  );

  const handlePreviousGameButtonClick = () => {
    if (!previousGame) return;

    void router.push(`/activities/${activity.id}/games/${previousGame.id}`);
  };
  const handleNextGameButtonClick = () => {
    if (!nextGame) return;

    void router.push(`/activities/${activity.id}/games/${nextGame.id}`);
  };

  return (
    <div className="flex flex-col gap-y-16">
      <section id="game-details">
        <h2 className="mb-4">{`${gameNumber} 試合目`}</h2>
        <GameDetails gameDetails={game.gameDetails} />
      </section>
      {resters.length !== 0 && (
        <section id="resters">
          <h2 className="mb-4">休憩</h2>
          <ParticipantTable data={resters} />
        </section>
      )}
      <nav className="flex justify-center">
        <ul className="flex w-full justify-between text-muted-foreground sm:max-w-sm">
          <li>
            <Button
              variant="ghost"
              className="flex gap-x-2"
              disabled={previousGame === undefined}
              onClick={handlePreviousGameButtonClick}
            >
              <ArrowLeftIcon className="h-4 w-4" />
              前の試合
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              className="flex gap-x-2"
              disabled={nextGame === undefined}
              onClick={handleNextGameButtonClick}
            >
              次の試合
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Game;
