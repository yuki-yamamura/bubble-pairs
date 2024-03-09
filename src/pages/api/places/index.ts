import { createPlace, findPlaces } from '@/features/places/logic/repository';
import { placeCreateSchema } from '@/features/places/validation';
import { withZod } from '@/lib/next';
import { authOptions } from '@/lib/next-auth';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

import type { Prisma } from '@prisma/client';
import type { NextApiHandler } from 'next';

const handleGet: NextApiHandler = async (request, response) => {
  const session = await getServerSession(request, response, authOptions);
  if (!session) {
    response.end(401);

    return;
  }
  const result = await findPlaces({
    owner: {
      email: session.user.email,
    },
  });

  if (result.type === 'success') {
    response.json({ places: result.data });
  } else {
    console.error(result.error);
    response.status(400).end();
  }
};

const handlePost: NextApiHandler = withZod(
  z.object({
    body: placeCreateSchema,
  }),
  async (request, response) => {
    const session = await getServerSession(request, response, authOptions);
    if (!session) {
      response.status(403).end();

      return;
    }

    const data = {
      owner: {
        connect: { email: session.user.email },
      },
      ...request.body,
    } satisfies Prisma.PlaceCreateInput;
    const result = await createPlace(data);

    if (result.type === 'success') {
      response.status(201).end();
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
