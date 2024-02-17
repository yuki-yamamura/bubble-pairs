import { fakeMembers } from '@/mocks/fakeData/members';
import { rest } from 'msw';

import type { GetResponseData } from '@/types/api/members';

export const membersHandler = rest.get(
  '/api/members',
  (_, response, context) => {
    return response(context.json<GetResponseData>({ members: fakeMembers }));
  },
);
