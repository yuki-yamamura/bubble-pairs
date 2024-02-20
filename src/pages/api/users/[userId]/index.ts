import { deleteUserById } from '@/features/users/logic/repository';
import { withZod } from '@/lib/next';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

import type { NextApiHandler } from 'next';

const handleDelete: NextApiHandler = withZod(
  z.object({
    query: z.object({
      userId: z.string(),
    }),
  }),
  async (request, response) => {
    const session = await getServerSession();
    if (!session) {
      response.end(403);
    }

    const { userId } = request.query;

    const result = await deleteUserById(userId);
    if (result.type === 'success') {
      response.status(204).end();
    } else {
      console.error(result.error);
      response.status(400).end();
    }
  },
);

const handler: NextApiHandler = (request, response) => {
  switch (request.method) {
    case 'DELETE':
      return handleDelete(request, response);
  }
};

export default handler;
