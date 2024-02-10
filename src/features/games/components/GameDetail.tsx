import Emoji from '@/components/Emoji';
import { Card, CardContent } from '@/components/ui/card';

import type { Game } from '@/types/models/Game';

type Props = {
  game: Game;
};

const GameDetail = ({ game }: Props) => {
  return (
    <div className="flex flex-col gap-y-4">
      {game.gameDetails.map((gameDetail) => (
        <Card key={gameDetail.id}>
          <CardContent className="pt-4">
            <div>{`コートNo. ${gameDetail.courtNumber}`}</div>
            <div className="flex items-center gap-x-4">
              <div>
                {gameDetail.players.slice(0, 2).map((player) => (
                  <div key={player.id} className="flex items-center gap-x-2">
                    <div className="mb-2 max-w-fit rounded-full bg-gray-50 p-2 text-sm">
                      <Emoji
                        unified={player.participant.member.emojiUnicode}
                        size={14}
                      />
                    </div>
                    <div>{player.participant.member.name}</div>
                  </div>
                ))}
              </div>

              <div>vs</div>
              <div>
                {gameDetail.players.slice(2, 4).map((player) => (
                  <div key={player.id} className="flex items-center gap-x-2">
                    <div className="mb-2 max-w-fit rounded-full bg-gray-50 p-2 text-sm">
                      <Emoji
                        unified={player.participant.member.emojiUnicode}
                        size={16}
                      />
                    </div>
                    <div>{player.participant.member.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default GameDetail;
