import { Level } from '@prisma/client';

import type { Options } from '@/types/Options';

export const levelOptions: Options<Level> = [
  { label: '入門', value: Level.BEGINNER },
  { label: '初級', value: Level.ELEMENTARY },
  { label: '中級', value: Level.INTERMEDIATE },
  { label: '上級', value: Level.ADVANCED },
];
