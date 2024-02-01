import {
  deleteActivity,
  findActivityById,
  updateActivity,
} from '@/features/activities/logic/repository';
import { activityUpdateSchema } from '@/features/activities/validation';
import { withZod } from '@/lib/next';
import { z } from 'zod';

import type { Activity } from '@/types/models/Activity';
import type { NextApiHandler } from 'next';

export type GetResponseData = {
  activity: Activity;
};
const handleGet: NextApiHandler<GetResponseData> = withZod(
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
    body: activityUpdateSchema,
  }),
  async (request, response) => {
    const id = parseInt(request.query.activityId);
    const result = await updateActivity({ ...request.body, id });

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
    const id = parseInt(request.query.activityId);
    const result = await deleteActivity(id);

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
    case 'PUT':
      return handlePut(request, response);
    case 'DELETE':
      return handleDelete(request, response);
  }
};

export default handler;
