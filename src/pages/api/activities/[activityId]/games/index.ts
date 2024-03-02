import { findActivityById } from '@/features/activities/logic/repository';
import { generateGame } from '@/features/games/logic';
import { createGame } from '@/features/games/logic/repository';
import { gameCreateSchema } from '@/features/games/validation';
import { withZod } from '@/lib/next';
import { z } from 'zod';

import type { NextApiHandler } from 'next';

const handlePost: NextApiHandler = withZod(
  z.object({
    body: gameCreateSchema,
  }),
  async (request, response) => {
    const { activityId } = request.body;
    const activityResult = await findActivityById(activityId);

    if (activityResult.type === 'error') {
      console.error(activityResult.error);
      response.status(400).end();
    } else if (activityResult.data === null) {
      response.status(400).end();
    } else {
      const newGame = generateGame({
        activity: activityResult.data,
        ...request.body,
      });
      const gameResult = await createGame(newGame);

      if (gameResult.type === 'success') {
        response.status(200).json({ game: gameResult.data });
      } else {
        console.error(gameResult.error);
        response.status(400).end();
      }
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
