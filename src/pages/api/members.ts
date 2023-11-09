import { findAllMembers } from '@/features/members/logic';

import type { Member } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export type MembersResponseData = {
  members: Member[];
};

const handler = async (
  _request: NextApiRequest,
  response: NextApiResponse<MembersResponseData>,
) => {
  const members = await findAllMembers();

  response.json({ members });
};

export default handler;
