import {
  deleteGameById,
  findGameById,
} from '@/features/games/logic/repository';
import { withZod } from '@/lib/next';
import { z } from 'zod';

import type { NextApiHandler } from 'next';

const handleGet: NextApiHandler = withZod(
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
      console.error(result.error);
      response.status(400).end();
    }
  },
);

const handleDelete: NextApiHandler = withZod(
  z.object({
    query: z.object({
      activityId: z.string(),
      gameId: z.string(),
    }),
  }),
  async (request, response) => {
    const { gameId } = request.query;
    const result = await deleteGameById(gameId);

    if (result.type === 'success') {
      response.status(204).end();
    } else {
      console.error(result.error);
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
