import GameDetails from './GameDetails';
import ParticipantTable from '@/features/activities/components/ParticipantTable';

import type { Activity } from '@/types/models/Activity';
import type { Game as GameType } from '@/types/models/Game';
import type { Participant } from '@/types/models/Participant';

type Props = {
  activity: Activity;
  game: GameType;
};

const Game = ({ activity, game }: Props) => {
  const gameNumber = activity.games.findIndex(({ id }) => id === game.id) + 1;
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
        <GameDetails gameDetails={game.gameDetails} />
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

export default Game;
