import { membersHandler } from './membersHandler';

import type { RequestHandler } from 'msw';

export const handlers: RequestHandler[] = [membersHandler];
