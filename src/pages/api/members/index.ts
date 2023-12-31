import {
  createMember,
  findAllMembers,
} from '@/features/members/logic/repository';
import { memberFormSchema } from '@/features/members/validation';
import { withZod } from '@/lib/next';
import { z } from 'zod';

import type { Member } from '@prisma/client';
import type { NextApiHandler } from 'next';

export type GetResponseData = {
  members: Member[];
};

export type PostResponseData = {
  member: Member;
};

const handleGet: NextApiHandler<GetResponseData> = async (
  _request,
  response,
) => {
  const result = await findAllMembers();

  if (result.type === 'success') {
    response.json({ members: result.data });
  } else {
    response.status(400).end();
  }
};

const handlePost: NextApiHandler<PostResponseData> = withZod(
  z.object({
    body: memberFormSchema,
  }),
  async (request, response) => {
    const result = await createMember(request.body);

    if (result.type === 'success') {
      response.status(201).json({ member: result.data });
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
