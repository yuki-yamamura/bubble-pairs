import { fakeMembers } from '@/mocks/fakeData/members';
import { rest } from 'msw';

import type { GetResponseData } from '@/pages/api/members';

export const membersHandler = rest.get(
  '/api/members',
  (_request, response, context) => {
    return response(context.json<GetResponseData>({ members: fakeMembers }));
  },
);
