import type { SortKey } from '@/features/members/types/SortKey';

export const options: {
  label: string;
  value: SortKey;
}[] = [
  {
    label: '登録順',
    value: 'createdAt',
  },
  {
    label: '表示名順',
    value: 'displayName',
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
