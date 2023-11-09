import { fakeMembers } from '@/mocks/fakeData/members';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = (_request: NextApiRequest, response: NextApiResponse) => {
  // todo: implement logic to get members from the db.
  response.json({ members: fakeMembers });
};

export default handler;
