import type { Member } from '@prisma/client';

export const getDisplayName = (member: Member) => {
  return member.displayName ?? member.name;
};
