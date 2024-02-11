import { createPlace, findAllPlaces } from '@/features/places/logic/repository';
import { placeCreateSchema } from '@/features/places/validation';
import { withZod } from '@/lib/next';
import { authOptions } from '@/lib/next-auth';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

import type { Place } from '@prisma/client';
import type { NextApiHandler } from 'next';

export type GetResponseData = {
  places: Place[];
};

export type PostResponseData = {
  place: Place;
};

const handleGet: NextApiHandler<GetResponseData> = async (
  _request,
  response,
) => {
  const result = await findAllPlaces();

  if (result.type === 'success') {
    response.json({ places: result.data });
  } else {
    response.status(400);
  }
};

const handlePost: NextApiHandler<PostResponseData> = withZod(
  z.object({
    body: placeCreateSchema,
  }),
  async (request, response) => {
    const session = await getServerSession(request, response, authOptions);
    if (!session) {
      response.status(403).end();

      return;
    }

    const { id: ownerId } = session.user;
    const result = await createPlace({ ...request.body, ownerId });

    if (result.type === 'success') {
      response.status(201).end();
    } else {
      response.status(400).json({ error: result.error });
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
