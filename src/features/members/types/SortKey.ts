import type { Member } from '@prisma/client';

export type SortKey = keyof Pick<
  Member,
  // 'createdAt' | 'displayName' | 'sex' | 'level'
  'createdAt' | 'sex' | 'level'
>;
