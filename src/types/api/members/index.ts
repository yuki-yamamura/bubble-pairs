import type { Member } from '@prisma/client';

export type GetResponseData = {
  members: Member[];
};

export type PostResponseData = {
  member: Member;
};
