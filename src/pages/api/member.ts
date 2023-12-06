import { createMember } from '@/features/members/logic';
import { schemaForType } from '@/lib/react-hook-form';
import { Level, Sex } from '@prisma/client';
import { z } from 'zod';

import type { Member, Prisma } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export type MemberResponseData = {
  member: Member;
};

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<MemberResponseData>,
) => {
  // create
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
      response.status(400);
    }

    const newMember = await createMember(
      request.body as Prisma.MemberCreateInput,
    );

    response.status(201).json({ member: newMember });
  }
};

export default handler;
