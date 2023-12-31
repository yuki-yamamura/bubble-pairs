import { deletePlace, updatePlace } from '@/features/places/logic/repository';
import { placeFormSchema } from '@/features/places/validation';
import { withZod } from '@/lib/next';
import { z } from 'zod';

import type { NextApiHandler } from 'next';

const handlePut: NextApiHandler = withZod(
  z.object({
    query: z.object({
      id: z.string(),
    }),
    body: placeFormSchema,
  }),
  async (request, response) => {
    const id = parseInt(request.query.id);
    const result = await updatePlace({ id, ...request.body });

    if (result.type === 'success') {
      response.status(204).end();
    } else {
      response.status(400).json({ error: result.error });
    }
  },
);

const handleDelete: NextApiHandler = withZod(
  z.object({
    query: z.object({
      id: z.string(),
    }),
  }),
  async (request, response) => {
    const id = parseInt(request.query.id);
    const result = await deletePlace(id);

    if (result.type === 'success') {
      response.status(204).end();
    } else {
      response.status(400).json({ error: result.error });
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
