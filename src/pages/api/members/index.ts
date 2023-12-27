import {
  createMember,
  findAllMembers,
} from '@/features/members/logic/repository';
import { schemaForType } from '@/lib/react-hook-form';
import { Level, Sex } from '@prisma/client';
import { z } from 'zod';

import type { Member, Prisma } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export type GetResponseData = {
  members: Member[];
};

export type PostResponseData = {
  member: Member;
};

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<GetResponseData | PostResponseData>,
) => {
  // read members
  if (request.method === 'GET') {
    const result = await findAllMembers();

    if (result.type === 'success') {
      response.json({ members: result.data });
    } else {
      response.status(400).end();
    }
  }

  // create a member
  if (request.method === 'POST') {
    const schema = schemaForType<Prisma.MemberCreateInput>()(
      z.object({
        updatedAt: z.date(),
        avatar: z.string(),
        name: z.string(),
        kana: z.string().nullable(),
        displayName: z.string().nullable(),
        sex: z.nativeEnum(Sex),
        level: z.nativeEnum(Level),
        note: z.string().nullable(),
      }),
    );

    if (!schema.safeParse(request.body)) {
      response.status(400).end();
    }

    const result = await createMember(request.body as Prisma.MemberCreateInput);

    if (result.type === 'success') {
      return response.json({ member: result.data });
    } else {
      return response.status(400).end();
    }
  }
};

export default handler;
