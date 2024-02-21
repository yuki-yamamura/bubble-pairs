import { DOUBLES_PLAYER_COUNT, SINGLES_PLAYER_COUNT } from '@/constants';
import { findActivityById } from '@/features/activities/logic/repository';
import { createGame, findAllGames } from '@/features/games/logic/repository';
import { gameCreateSchema } from '@/features/games/validation';
import { withZod } from '@/lib/next';
import { $Enums } from '@prisma/client';
import { z } from 'zod';

import type { Prisma } from '@prisma/client';
import type { NextApiHandler } from 'next';

const handleGet: NextApiHandler = async (_, response) => {
  const result = await findAllGames();

  if (result.type === 'success') {
    response.json({ games: result.data });
  } else {
    console.error(result.error);
    response.status(400).end();
  }
};

const handlePost: NextApiHandler = withZod(
  z.object({
    body: gameCreateSchema,
  }),
  async (request, response) => {
    const { memberIds, singlesCount, doublesCount } = request.body;
    const activityResult = await findActivityById(request.body.activityId);

    if (activityResult.type === 'error') {
      console.error(activityResult.error);
      throw activityResult.error;
    }

    const singlesPlayerCount = singlesCount * SINGLES_PLAYER_COUNT;
    const doublesPlayerCount = doublesCount * DOUBLES_PLAYER_COUNT;
    const totalPlayerCount = singlesPlayerCount + doublesPlayerCount;

    const currentGameDetails =
      activityResult.data?.games.map((game) => game.gameDetails).flat() ?? [];
    const currentPlayers = currentGameDetails
      .map((gameDetail) => gameDetail.players)
      .flat();
    const electedMembers = memberIds
      .map(({ memberId }) =>
        activityResult.data?.participants.find(
          (participant) => participant.memberId === memberId,
        ),
      )
      .map((participant) => ({
        participantId: participant?.id,
        gameCount: currentPlayers.filter(
          (player) => player.participant.id === participant?.id,
        ).length,
      }))
      .sort((a, b) => (a.gameCount > b.gameCount ? 1 : -1))
      .slice(0, totalPlayerCount);

    const gameDetails = {
      create: [
        ...Array.from(Array(singlesCount), (_, index) => index).map((index) => {
          const start = index * SINGLES_PLAYER_COUNT;
          const end = start + SINGLES_PLAYER_COUNT;

          return {
            rule: $Enums.Rule.SINGLES,
            courtNumber: index + 1,
            players: {
              create: electedMembers.slice(start, end).map((player) => ({
                participant: {
                  connect: {
                    id: player.participantId,
                  },
                },
              })),
            },
          };
        }),
        ...Array.from(Array(doublesCount).keys()).map((index) => {
          const start = singlesPlayerCount + index * SINGLES_PLAYER_COUNT;
          const end = start + DOUBLES_PLAYER_COUNT;

          return {
            rule: $Enums.Rule.DOUBLES,
            courtNumber: singlesCount + index + 1,
            players: {
              create: electedMembers.slice(start, end).map((player) => ({
                participant: {
                  connect: {
                    id: player.participantId,
                  },
                },
              })),
            },
          };
        }),
      ],
    } satisfies Prisma.GameDetailCreateNestedManyWithoutGameInput;
    const data = {
      activity: {
        connect: {
          id: request.body.activityId,
        },
      },
      gameDetails,
    } satisfies Prisma.GameCreateInput;

    const gameResult = await createGame(data);

    if (gameResult.type === 'success') {
      response.status(200).json({ game: gameResult.data });
    } else {
      console.error(gameResult.error);
      response.status(400).end();
    }
  },
);

const handler: NextApiHandler = (request, response) => {
  switch (request.method) {
    case 'GET':
      return handleGet(request, response);
    case 'POST':
      return handlePost(request, response);
  }
};

export default handler;
