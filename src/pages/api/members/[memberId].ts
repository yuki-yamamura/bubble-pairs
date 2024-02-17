import {
  deleteMember,
  updateMember,
} from '@/features/members/logic/repository';
import { memberUpdateSchema } from '@/features/members/validation';
import { withZod } from '@/lib/next';
import { z } from 'zod';

import type { NextApiHandler } from 'next';

const handlePut: NextApiHandler = withZod(
  z.object({
    query: z.object({
      memberId: z.string(),
    }),
    body: memberUpdateSchema,
  }),
  async (request, response) => {
    const { memberId } = request.query;
    const result = await updateMember({ id: memberId, ...request.body });

    if (result.type === 'success') {
      response.status(204).end();
    } else {
      console.error(result.error);
      response.status(400).end();
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
    const { memberId } = request.query;
    const result = await deleteMember(memberId);

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
    case 'PUT':
      return handlePut(request, response);
    case 'DELETE':
      return handleDelete(request, response);
  }
};

export default handler;
