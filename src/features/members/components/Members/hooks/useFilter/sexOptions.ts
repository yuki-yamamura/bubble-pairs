import { Sex } from '@prisma/client';

import type { Options } from '@/types/Options';

export const sexOptions: Options<Sex> = [
  { label: '男性', value: Sex.MALE },
  { label: '女性', value: Sex.FEMALE },
  { label: '不明', value: Sex.NOT_KNOWN },
];
