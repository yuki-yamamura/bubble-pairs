import {
  deleteMember,
  updateMember,
} from '@/features/members/logic/repository';
import { memberFormSchema } from '@/features/members/validation';
import { withZod } from '@/lib/next';
import { z } from 'zod';

import type { NextApiHandler } from 'next';

const handlePut: NextApiHandler = withZod(
  z.object({
    query: z.object({
      memberId: z.string(),
    }),
    body: memberFormSchema,
  }),
  async (request, response) => {
    const id = parseInt(request.query.memberId);
    const result = await updateMember({ id, ...request.body });

    if (result.type === 'success') {
      response.status(204).end();
    } else {
      response.status(400).json({ error: result.error });
    }
  },
);

const handleDelete: NextApiHandler = withZod(
  z.object({
    query: z.object({
      memberId: z.string(),
    }),
  }),
  async (request, response) => {
    const id = parseInt(request.query.memberId);
    const result = await deleteMember(id);

    if (result.type === 'success') {
      response.status(204).end();
    } else {
      response.status(400).json({ error: result.error });
    }
  },
);

const handler: NextApiHandler = (request, response) => {
  switch (request.method) {
    case 'PUT':
      return handlePut(request, response);
    case 'DELETE':
      return handleDelete(request, response);
  }
};

export default handler;
