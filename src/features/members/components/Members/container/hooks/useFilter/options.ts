import { $Enums } from '@prisma/client';

const { Sex, Level } = $Enums;

export const sexOptions = [
  { label: '男性', value: Sex.MALE },
  { label: '女性', value: Sex.FEMALE },
  { label: '不明', value: Sex.NOT_KNOWN },
];

export const levelOptions = [
  { label: '入門', value: Level.BEGINNER },
  { label: '初級', value: Level.ELEMENTARY },
  { label: '中級', value: Level.INTERMEDIATE },
  { label: '上級', value: Level.ADVANCED },
];
