import type { Level, Sex } from '@prisma/client';

export const sortKeys = [
  {
    label: '登録日',
    value: 'createdAt',
  },
  {
    label: '性別',
    value: 'sex',
  },
  {
    label: 'レベル',
    value: 'level',
  },
] as const;

export const levelMap = new Map<Level, string>([
  ['BEGINNER', '入門'],
  ['ELEMENTARY', '初心者'],
  ['INTERMEDIATE', '中級者'],
  ['ADVANCED', '上級者'],
]);

export const sexMap = new Map<Sex, string>([
  ['NOT_KNOWN', '不明'],
  ['MALE', '男性'],
  ['FEMALE', '女性'],
]);
