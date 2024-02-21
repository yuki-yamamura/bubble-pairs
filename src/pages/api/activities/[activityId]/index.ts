import {
  deleteActivityById,
  findActivityById,
  updateActivity,
} from '@/features/activities/logic/repository';
import { activityUpdateSchema } from '@/features/activities/validation';
import { withZod } from '@/lib/next';
import { z } from 'zod';

import type { NextApiHandler } from 'next';

const handleGet: NextApiHandler = withZod(
  z.object({
    query: z.object({
      activityId: z.string(),
    }),
  }),
  async (request, response) => {
    const id = request.query.activityId;
    const result = await findActivityById(id);

    if (result.type === 'success') {
      response.json({ activity: result.data });
    } else {
      console.error(result.error);
      response.status(400).end();
    }
  },
);

const handlePut: NextApiHandler = withZod(
  z.object({
    query: z.object({
      activityId: z.string(),
    }),
    body: activityUpdateSchema,
  }),
  async (request, response) => {
    const id = request.query.activityId;
    const result = await updateActivity({ ...request.body, id });

    if (result.type === 'success') {
      response.status(204).end();
    } else {
      console.error(result.error);
      response.status(400).end();
    }
  },
);

const handleDelete = withZod(
  z.object({
    query: z.object({
      activityId: z.string(),
    }),
  }),
  async (request, response) => {
    const id = request.query.activityId;
    const result = await deleteActivityById(id);

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
    case 'GET':
      return handleGet(request, response);
    case 'PUT':
      return handlePut(request, response);
    case 'DELETE':
      return handleDelete(request, response);
  }
};

export default handler;
