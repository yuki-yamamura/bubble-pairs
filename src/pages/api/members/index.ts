import {
  createMember,
  findAllMembers,
} from '@/features/members/logic/repository';
import { memberCreateSchema } from '@/features/members/validation';
import { withZod } from '@/lib/next';
import { authOptions } from '@/lib/next-auth';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

import type { Prisma } from '@prisma/client';
import type { NextApiHandler } from 'next';

const handleGet: NextApiHandler = async (_, response) => {
  const result = await findAllMembers();

  if (result.type === 'success') {
    response.json({ members: result.data });
  } else {
    console.error(result.error);
    response.status(400).end();
  }
};

const handlePost: NextApiHandler = withZod(
  z.object({
    body: memberCreateSchema,
  }),
  async (request, response) => {
    const session = await getServerSession(request, response, authOptions);

    if (!session) {
      response.status(403).end();

      return;
    }

    const data = {
      owner: {
        connect: { id: session.user.id },
      },
      ...request.body,
    } satisfies Prisma.MemberCreateInput;
    const result = await createMember(data);

    if (result.type === 'success') {
      response.status(201).json({ member: result.data });
    } else {
      console.error(result.error);
      response.status(400);
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
