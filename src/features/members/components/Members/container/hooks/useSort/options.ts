import type { Member } from '@prisma/client';

export type SortKey = keyof Pick<
  Member,
  'createdAt' | 'kana' | 'sex' | 'level'
>;

export const options: {
  label: string;
  value: SortKey;
}[] = [
  {
    label: '登録順',
    value: 'createdAt',
  },
  {
    label: '名前順',
    value: 'kana',
  },
  {
    label: '性別順',
    value: 'sex',
  },
  {
    label: 'レベル順',
    value: 'level',
  },
];
