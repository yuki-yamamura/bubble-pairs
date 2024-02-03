import { createGame, findAllGames } from '@/features/games/logic/repository';
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
    const { activityId, members, singlesCount, doublesCount } = request.body;
    console.log({ activityId, members, singlesCount, doublesCount });

    const data = {
      activity: {
        connect: {
          id: activityId,
        },
      },
      gameDetails: {
        create: [
          {
            rule: $Enums.Rule.SINGLES,
            players: {
              create: [
                {
                  participant: {
                    connect: {
                      id: 1,
                    },
                  },
                },
                {
                  participant: {
                    connect: {
                      id: 2,
                    },
                  },
                },
              ],
            },
          },
          {
            rule: $Enums.Rule.DOUBLES,
            players: {
              create: [
                {
                  participant: {
                    connect: {
                      id: 1,
                    },
                  },
                },
                {
                  participant: {
                    connect: {
                      id: 2,
                    },
                  },
                },
                {
                  participant: {
                    connect: {
                      id: 3,
                    },
                  },
                },
                {
                  participant: {
                    connect: {
                      id: 4,
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    } satisfies Prisma.GameCreateInput;
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
