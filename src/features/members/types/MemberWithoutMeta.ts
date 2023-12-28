import type { Member } from '@prisma/client';

// todo: exclude avatar in this type.
export type MemberWithoutMeta = Omit<Member, 'id' | 'createdAt' | 'updatedAt'>;
