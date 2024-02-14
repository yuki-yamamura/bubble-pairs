import { fakePlaces } from '@/mocks/fakeData/places';
import { rest } from 'msw';

import type { GetResponseData } from '@/pages/api/places';

export const placesHandler = rest.get(
  '/api/places',
  (_request, response, context) => {
    return response(context.json<GetResponseData>({ places: fakePlaces }));
  },
);
