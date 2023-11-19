import type { SortKey } from '@/features/members/types/SortKey';

export const options: {
  labelText: string;
  value: SortKey;
}[] = [
  {
    labelText: '登録順',
    value: 'createdAt',
  },
  {
    labelText: '表示名順',
    value: 'displayName',
  },
  {
    labelText: '性別順',
    value: 'sex',
  },
  {
    labelText: 'レベル順',
    value: 'level',
  },
];
