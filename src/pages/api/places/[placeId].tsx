import { deletePlace, updatePlace } from '@/features/places/logic/repository';
import { placeCreateSchema } from '@/features/places/validation';
import { withZod } from '@/lib/next';
import { z } from 'zod';

import type { NextApiHandler } from 'next';

const handlePut: NextApiHandler = withZod(
  z.object({
    query: z.object({
      placeId: z.string(),
    }),
    body: placeCreateSchema,
  }),
  async (request, response) => {
    const { placeId: id } = request.query;
    const result = await updatePlace({ id, ...request.body });

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
      placeId: z.string(),
    }),
  }),
  async (request, response) => {
    const { placeId } = request.query;
    const result = await deletePlace(placeId);

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
