import { fakeMembers } from '../fakeData/members';
import { rest } from 'msw';

import type { Member } from '@/features/members/types/Member';

const membersHandler = rest.get(
  '/api/members',
  (_request, response, context) => {
    return response(
      context.json<{ members: Member[] }>({ members: fakeMembers }),
    );
  },
);

export default membersHandler;
