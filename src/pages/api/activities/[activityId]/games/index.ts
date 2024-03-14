import { findActivityById } from '@/features/activities/logic/repository';
import { generateGameInput } from '@/features/games/logic';
import { createGame } from '@/features/games/logic/repository';
import { gameCreateSchema } from '@/features/games/validation';
import { withZod } from '@/lib/next';
import { z } from 'zod';

import type { Game } from '@prisma/client';
import type { NextApiHandler } from 'next';

const handlePost: NextApiHandler = withZod(
  z.object({
    body: gameCreateSchema,
  }),
  async (request, response) => {
    const { activityId, gameCount } = request.body;
    const games: Game[] = [];

    for (let i = 0; i < gameCount; i++) {
      const activityResult = await findActivityById(activityId);

      if (activityResult.type === 'error') {
        console.error(activityResult.error);
        response.status(400).end();
      } else if (!activityResult.data) {
        response.status(400).end();
      } else {
        const data = generateGameInput({
          activity: activityResult.data,
          ...request.body,
        });
        // I couldn't make a transaction in this case because of a technical problem:
        //   - calculating the players depends on previous activity, so we have to commit insert queries within a transaction.
        //   - it seems like Prism does not offer the way to solve the above problem.
        const gameResult = await createGame(data);

        if (gameResult.type === 'success') {
          games.push(gameResult.data);
        } else {
          console.error(gameResult.error);
          response.status(400).end();
        }
      }
    }

    response.json({ games });
  },
);

const handler: NextApiHandler = (request, response) => {
  switch (request.method) {
    case 'POST':
      return handlePost(request, response);
  }
};

export default handler;
