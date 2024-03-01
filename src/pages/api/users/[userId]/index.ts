import { deleteUserById, updateUser } from '@/features/users/logic/repository';
import { userUpdateSchema } from '@/features/users/validation';
import { withZod } from '@/lib/next';
import { authOptions } from '@/lib/next-auth';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

import type { NextApiHandler } from 'next';

const handlePut: NextApiHandler = withZod(
  z.object({
    query: z.object({
      userId: z.string(),
    }),
    body: userUpdateSchema,
  }),
  async (request, response) => {
    const session = await getServerSession(request, response, authOptions);
    const { userId: id } = request.query;

    if (id !== session?.user.id) {
      response.status(403).end();
    }

    const result = await updateUser({ id, ...request.body });

    if (result.type === 'success') {
      response.status(204).end();
    } else {
      console.error(result.error);
      response.status(400).end();
    }
  },
);

const handleDelete: NextApiHandler = withZod(
  z.object({
    query: z.object({
      userId: z.string(),
    }),
  }),
  async (request, response) => {
    const session = await getServerSession(request, response, authOptions);
    const { userId } = request.query;

    if (userId !== session?.user.id) {
      response.status(403).end();
    }

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
    case 'PUT':
      return handlePut(request, response);
    case 'DELETE':
      return handleDelete(request, response);
  }
};

export default handler;
