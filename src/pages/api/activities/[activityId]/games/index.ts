import { createGame, findAllGames } from '@/features/games/logic/repository';
import { gameFormSchema } from '@/features/games/validation';
import { withZod } from '@/lib/next';
import { Rule } from '@prisma/client';
import { z } from 'zod';

import type { Game } from '@prisma/client';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

type GetResponseData = {
  games: Game[];
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
    query: z.object({
      activityId: z.string(),
    }),
    body: gameFormSchema,
  }),
  async (request, response) => {
    const activityId = parseInt(request.query.activityId);
    const { singlesCount } = request.body;

    // todo: remove temporary logic below, and rewrite one to create a game correctly.
    const data = {
      activityId,
      gameDetails: {
        create: Array.from(Array(singlesCount), (_, index) => index + 1).map(
          (courtNumber) => ({
            courtNumber,
            rule: Rule.SINGLES,
            players: {
              create: [
                {
                  playerNumber: 1,
                  memberId: 1,
                },
                {
                  playerNumber: 2,
                  memberId: 2,
                },
              ],
            },
          }),
        ),
      },
    };
    const result = await createGame(data);

    if (result.type === 'success') {
      response.status(201).json({ game: result.data });
    } else {
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
