import { updateDefaultPlace } from '@/features/places/logic/repository';
import { defaultPlaceSchema } from '@/features/places/validation';
import { withZod } from '@/lib/next';
import { z } from 'zod';

import type { NextApiHandler } from 'next';

const handlePost: NextApiHandler = withZod(
  z.object({
    body: defaultPlaceSchema,
  }),
  async (request, response) => {
    const { placeId } = request.body;
    const result = await updateDefaultPlace(placeId);

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
    case 'POST':
      return handlePost(request, response);
  }
};

export default handler;
