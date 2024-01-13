import {
  deleteActivity,
  findActivityById,
  updateActivity,
} from '@/features/activities/logic/repository';
import { activityFormSchema } from '@/features/activities/validation';
import { withZod } from '@/lib/next';
import { z } from 'zod';

import type { NextApiHandler } from 'next';

const handleGet = withZod(
  z.object({
    query: z.object({
      activityId: z.string(),
    }),
  }),
  async (request, response) => {
    const activityId = parseInt(request.query.activityId);
    const result = await findActivityById(activityId);

    if (result.type === 'success') {
      response.json({
        activity: result.data,
      });
    } else {
      response.status(400).json({
        error: result.error,
      });
    }
  },
);

const handlePut = withZod(
  z.object({
    query: z.object({
      activityId: z.string(),
    }),
    body: activityFormSchema,
  }),
  async (request, response) => {
    const activityId = parseInt(request.query.activityId);
    const result = await updateActivity({ ...request.body, id: activityId });

    if (result.type === 'success') {
      response.status(204).end();
    } else {
      response.status(400).json({ error: result.error });
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
    const activityId = parseInt(request.query.activityId);
    const result = await deleteActivity(activityId);

    if (result.type === 'success') {
      response.status(204).end();
    } else {
      response.status(400).json({ error: result.error });
    }
  },
);

const handler: NextApiHandler = (request, response) => {
  switch (request.method) {
    case 'GET':
      return handleGet(request, response);
    case 'UPDATE':
      return handlePut(request, response);
    case 'DELETE':
      return handleDelete(request, response);
  }
};

export default handler;
