import { fakeMembers } from '../fakeData/members';
import { rest } from 'msw';

import type { MembersResponseData } from '@/pages/api/members';

export const membersHandler = rest.get(
  '/api/members',
  (_request, response, context) => {
    return response(
      context.json<MembersResponseData>({ members: fakeMembers }),
    );
  },
);
