import { DOUBLES_PLAYER_COUNT, SINGLES_PLAYER_COUNT } from '@/constants';
import { findActivityById } from '@/features/activities/logic/repository';
import { createGame, findAllGames } from '@/features/games/logic/repository';
import {
  calculateDoublesPlayerCount,
  calculateSinglesPlayerCount,
} from '@/features/games/logic/utils';
import { gameCreateSchema } from '@/features/games/validation';
import { withZod } from '@/lib/next';
import { $Enums } from '@prisma/client';
import { z } from 'zod';

import type { Game, Prisma } from '@prisma/client';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

type GetResponseData = {
  games: Game[];
};

export type PostResponseData = {
  game: Game;
};

const handleGet = async (
  _request: NextApiRequest,
  response: NextApiResponse<GetResponseData>,
) => {
  const result = await findAllGames();

  if (result.type === 'success') {
    response.json({ games: result.data });
  } else {
    response.status(400).end();
  }
};

const handlePost = withZod(
  z.object({
    body: gameCreateSchema,
  }),
  async (request, response) => {
    const { members } = request.body;
    const activityResult = await findActivityById(request.body.activity.id);

    if (activityResult.type === 'error') {
      throw activityResult.error;
    }

    const singlesCount = parseInt(request.body.singlesCount);
    const doublesCount = parseInt(request.body.doublesCount);
    const singlesPlayerCount = calculateSinglesPlayerCount(singlesCount);
    const doublesPlayerCount = calculateDoublesPlayerCount(doublesCount);
    const totalPlayerCount = singlesPlayerCount + doublesPlayerCount;

    const currentGameDetails =
      activityResult.data?.games.map((game) => game.gameDetails).flat() ?? [];
    const currentPlayers = currentGameDetails
      .map((gameDetail) => gameDetail.players)
      .flat();
    const electedMembers = members
      .map((member) =>
        activityResult.data?.participants.find(
          (participant) => participant.memberId === member.memberId,
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
          const start = singlesPlayerCount + calculateSinglesPlayerCount(index);
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
          id: request.body.activity.id,
        },
      },
      gameDetails,
    } satisfies Prisma.GameCreateInput;

    const gameResult = await createGame(data);

    if (gameResult.type === 'success') {
      response.status(200).json({ game: gameResult.data });
    } else {
      response.status(400).json({ error: gameResult.error });
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
