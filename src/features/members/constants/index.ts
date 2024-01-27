import type { Level, Sex } from '@prisma/client';

export const levelMap = {
  BEGINNER: '入門',
  ELEMENTARY: '初心者',
  INTERMEDIATE: '中級者',
  ADVANCED: '上級者',
} satisfies Record<Level, string>;

export const sexMap = {
  MALE: '男性',
  FEMALE: '女性',
  NOT_KNOWN: '不明',
} satisfies Record<Sex, string>;
