import { createSite, findAllSites } from '@/features/sites/logic/repository';
import { siteFormSchema } from '@/features/sites/validation';
import { withZod } from '@/lib/next';
import { z } from 'zod';

import type { NextApiHandler } from 'next';

const handleGet: NextApiHandler = async (_request, response) => {
  const result = await findAllSites();

  if (result.type === 'success') {
    response.json({ sites: result.data });
  }
};

const handlePost: NextApiHandler = withZod(
  z.object({
    body: siteFormSchema,
  }),
  async (request, response) => {
    const result = await createSite(request.body);

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
