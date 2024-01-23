import { createGame, findAllGames } from '@/features/games/logic/repository';
import { gameFormSchema } from '@/features/games/validation';
import { withZod } from '@/lib/next';
import { $Enums } from '@prisma/client';
import { z } from 'zod';

import type { Game, Prisma } from '@prisma/client';
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
    body: gameFormSchema,
  }),
  async (request, response) => {
    const { activityId, members, singlesCount, doublesCount } = request.body;
    console.log({ activityId, members, singlesCount, doublesCount });

    const data = {
      activityId,
      gameDetails: {
        create: [
          {
            rule: $Enums.Rule.SINGLES,
            players: {
              create: [
                {
                  participantId: 1,
                },
                {
                  participantId: 2,
                },
              ],
            },
          },
          {
            rule: $Enums.Rule.DOUBLES,
            players: {
              create: [
                {
                  participantId: 3,
                },
                {
                  participantId: 4,
                },
                {
                  participantId: 5,
                },
                {
                  participantId: 6,
                },
              ],
            },
          },
        ],
      },
    } satisfies Prisma.GameUncheckedCreateInput;
    const result = await createGame(data);

    if (result.type === 'success') {
      response.status(200).json({ game: result.data });
    } else {
      response.status(400).json({ error: result.error });
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
