import { fakeMembers } from '../fakeData/members';
import { rest } from 'msw';

import type { MemberWithoutMeta } from '@/features/members/types/MemberWithoutMeta';
import type { MemberResponseData } from '@/pages/api/member';
import type { Member } from '@prisma/client';

export const memberHandler = rest.post(
  '/api/member',
  async (request, response, context) => {
    const body = await request.json<MemberWithoutMeta>();
    const newMember: Member = {
      ...body,
      id: fakeMembers.length + 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      avatar: 'https://picsum.photos/200/300.jpg?random=1',
    };

    return response(
      context.status(201),
      context.json<MemberResponseData>({ member: newMember }),
    );
  },
);
