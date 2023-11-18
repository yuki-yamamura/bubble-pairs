import type { Member } from '@prisma/client';

// todo: include avatar in this type.
export type MemberWithoutMeta = Omit<
  Member,
  'id' | 'createdAt' | 'updatedAt' | 'avatar'
>;
