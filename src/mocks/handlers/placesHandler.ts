import { fakePlaces } from '@/mocks/fakeData/places';
import { rest } from 'msw';

import type { GetResponseData } from '@/types/api/places';

export const placesHandler = rest.get('/api/places', (_, response, context) => {
  return response(context.json<GetResponseData>({ places: fakePlaces }));
});
