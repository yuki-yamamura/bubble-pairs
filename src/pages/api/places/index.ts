import { createPlace, findAllPlaces } from '@/features/places/logic/repository';
import { placeFormSchema } from '@/features/places/validation';
import { withZod } from '@/lib/next';
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
  }
};

const handlePost: NextApiHandler<PostResponseData> = withZod(
  z.object({
    body: placeFormSchema,
  }),
  async (request, response) => {
    const result = await createPlace(request.body);

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
