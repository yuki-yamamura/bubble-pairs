import {
  deleteMember,
  updateMember,
} from '@/features/members/logic/repository';
import { withZod } from '@/lib/next';
import { Level, Sex } from '@prisma/client';
import { z } from 'zod';

import type { NextApiHandler } from 'next';

const handlePut: NextApiHandler = withZod(
  z.object({
    query: z.object({
      id: z.string(),
    }),
    body: z.object({
      name: z.string().min(1, '名前を入力してください。'),
      kana: z.string().nullable(),
      displayName: z.string().nullable(),
      sex: z.nativeEnum(Sex),
      level: z.nativeEnum(Level),
      note: z.string().nullable(),
    }),
  }),
  async (request, response) => {
    const id = parseInt(request.query.id);
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
      id: z.string(),
    }),
  }),
  async (request, response) => {
    const id = parseInt(request.query.id);
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
