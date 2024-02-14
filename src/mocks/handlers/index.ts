import { membersHandler } from './membersHandler';
import { placesHandler } from './placesHandler';

import type { RequestHandler } from 'msw';

export const handlers: RequestHandler[] = [membersHandler, placesHandler];
