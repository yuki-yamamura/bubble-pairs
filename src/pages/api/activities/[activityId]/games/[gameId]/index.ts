import { deleteGame, findGameById } from '@/features/games/logic/repository';
import { withZod } from '@/lib/next';
import { z } from 'zod';

import type { NextApiHandler } from 'next';

const handleGet = withZod(
  z.object({
    query: z.object({
      activityId: z.string(),
      gameNumber: z.string(),
    }),
  }),
  async (request, response) => {
    const activityId = parseInt(request.query.activityId);
    const gameNumber = parseInt(request.query.gameNumber);
    const result = await findGameById({ activityId, gameNumber });

    if (result.type === 'success') {
      response.json({ game: result.data });
    } else {
      response.status(400).json({ error: result.error });
    }
  },
);

const handleDelete = withZod(
  z.object({
    query: z.object({
      activityId: z.string(),
      gameNumber: z.string(),
    }),
  }),
  async (request, response) => {
    const activityId = parseInt(request.query.activityId);
    const gameNumber = parseInt(request.query.gameNumber);
    const result = await deleteGame({ activityId, gameNumber });

    if (result.type === 'success') {
      response.status(204).end();
    } else {
      response.status(400).json({ error: result.error });
    }
  },
);

const handler: NextApiHandler = (request, response) => {
  switch (request.method) {
    case 'GET':
      return handleGet(request, response);
    case 'DELETE':
      return handleDelete(request, response);
  }
};

export default handler;
