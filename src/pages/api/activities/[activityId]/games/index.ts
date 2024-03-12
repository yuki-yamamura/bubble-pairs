import { findActivityById } from '@/features/activities/logic/repository';
import { generateGame } from '@/features/games/logic';
import { createGames } from '@/features/games/logic/repository';
import { gameCreateSchema } from '@/features/games/validation';
import { withZod } from '@/lib/next';
import { z } from 'zod';

import type { Prisma } from '@prisma/client';
import type { NextApiHandler } from 'next';

const handlePost: NextApiHandler = withZod(
  z.object({
    body: gameCreateSchema,
  }),
  async (request, response) => {
    const { activityId, gameCount } = request.body;
    const inputs: Prisma.GameCreateInput[] = [];

    for (let i = 0; i < gameCount; i++) {
      const result = await findActivityById(activityId);

      if (result.type === 'error') {
        console.error(result.error);
        response.status(400).end();
      } else if (!result.data) {
        response.status(400).end();
      } else {
        const newGame = generateGame({
          activity: result.data,
          ...request.body,
        });
        inputs.push(newGame);
      }
    }

    const result = await createGames(inputs);

    if (result.type === 'success') {
      response.json({ games: result.data });
    } else {
      console.error(result.error);
      response.status(400).end();
    }
  },
);

const handler: NextApiHandler = (request, response) => {
  switch (request.method) {
    case 'POST':
      return handlePost(request, response);
  }
};

export default handler;
