import type { Level as PrismaLevel, Sex as PrismaSex } from '@prisma/client';

export const Level = {
  BEGINNER: '入門',
  ELEMENTARY: '初心者',
  INTERMEDIATE: '中級者',
  ADVANCED: '上級者',
} satisfies Record<PrismaLevel, string>;

export const Sex = {
  MALE: '男性',
  FEMALE: '女性',
  NOT_KNOWN: '不明',
} satisfies Record<PrismaSex, string>;
