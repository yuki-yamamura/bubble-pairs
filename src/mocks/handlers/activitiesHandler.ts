import { fakeActivities } from '../fakeData/activities';
import { rest } from 'msw';

import type { GetResponseData } from '@/types/api/activities/[activityId]';

const activity = fakeActivities[0];

export const activityHandler = rest.get(
  `/api/activities/${activity.id}`,
  (_, response, context) => {
    return response(context.json<GetResponseData>({ activity }));
  },
);
