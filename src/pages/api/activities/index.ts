import {
  createActivity,
  findAllActivities,
} from '@/features/activities/logic/repository';
import { activityFormSchema } from '@/features/activities/validation';
import { withZod } from '@/lib/next';
import { authOptions } from '@/lib/next-auth';
import { type ReturnTypeOf } from '@/utils/types';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

type GetResponseData = {
  activities: ReturnTypeOf<typeof findAllActivities>;
};

const handleGet = async (
  _request: NextApiRequest,
  response: NextApiResponse<GetResponseData>,
) => {
  const result = await findAllActivities();

  if (result.type === 'success') {
    response.json({ activities: result.data });
  } else {
    response.status(400).end();
  }
};

const handlePost = withZod(
  z.object({
    body: activityFormSchema,
  }),
  async (request, response) => {
    const session = await getServerSession(request, response, authOptions);
    if (!session) {
      response.status(401).end();

      return;
    }

    const { id: ownerId } = session.user;
    const { members, placeId } = request.body;
    const result = await createActivity({
      ownerId,
      placeId,
      isOpen: true,
      participants: {
        create: members,
      },
    });

    if (result.type === 'success') {
      response.status(201).json({ activity: result.data });
    } else {
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
