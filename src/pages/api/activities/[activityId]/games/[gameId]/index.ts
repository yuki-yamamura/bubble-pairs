import { deleteGame, findGameById } from '@/features/games/logic/repository';
import { withZod } from '@/lib/next';
import { z } from 'zod';

import type { NextApiHandler } from 'next';

const handleGet = withZod(
  z.object({
    query: z.object({
      activityId: z.string(),
      gameId: z.string(),
    }),
  }),
  async (request, response) => {
    const { gameId } = request.query;
    const result = await findGameById(gameId);

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
      gameId: z.string(),
    }),
  }),
  async (request, response) => {
    const { gameId } = request.query;
    const result = await deleteGame(gameId);

    if (result.type === 'success') {
      response.status(204).end();
    } else {
      console.log(result.error);
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
