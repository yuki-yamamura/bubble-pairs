import type { Member } from '@prisma/client';

export type MemberWithoutMeta = Omit<Member, 'id' | 'createdAt' | 'updatedAt'>;
