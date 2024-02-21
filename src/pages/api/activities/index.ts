import {
  createActivity,
  findAllActivities,
} from '@/features/activities/logic/repository';
import { activityCreateSchema } from '@/features/activities/validation';
import { withZod } from '@/lib/next';
import { authOptions } from '@/lib/next-auth';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

import type { Prisma } from '@prisma/client';
import type { NextApiHandler } from 'next';

const handleGet: NextApiHandler = async (_, response) => {
  const result = await findAllActivities();

  if (result.type === 'success') {
    response.json({ activities: result.data });
  } else {
    console.error(result.error);
    response.status(400).end();
  }
};

const handlePost = withZod(
  z.object({
    body: activityCreateSchema,
  }),
  async (request, response) => {
    const session = await getServerSession(request, response, authOptions);
    if (!session) {
      response.status(401).end();

      return;
    }

    const { memberIds, placeId, isOpen } = request.body;
    const data = {
      owner: {
        connect: { id: session.user.id },
      },
      participants: {
        create: memberIds,
      },
      place: {
        connect: { id: placeId },
      },
      isOpen,
    } satisfies Prisma.ActivityCreateInput;
    const result = await createActivity(data);

    if (result.type === 'success') {
      response.status(201).json({ activity: result.data });
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
    case 'POST':
      return handlePost(request, response);
  }
};

export default handler;
