import type { Member } from '@prisma/client';

export const fakeMembers: Member[] = [
  {
    id: 1,
    createdAt: new Date('2023-02-02T13:00:00+09:00'),
    updatedAt: new Date('2023-02-02T13:00:00+09:00'),
    emojiUnicode: '1f9d1',
    name: '田中 実',
    kana: 'タナカ ミノル',
    displayName: 'ミノ',
    sex: 'NOT_KNOWN',
    level: 'INTERMEDIATE',
    note: null,
  },
  {
    id: 2,
    createdAt: new Date('2023-02-21T13:00:00+09:00'),
    updatedAt: new Date('2023-02-21T13:00:00+09:00'),
    emojiUnicode: '1f9d1',
    name: '佐藤 春子',
    kana: 'サトウ ハルコ',
    displayName: 'Sさん',
    sex: 'FEMALE',
    level: 'ELEMENTARY',
    note: null,
  },
  {
    id: 3,
    createdAt: new Date('2023-03-27T13:00:00+09:00'),
    updatedAt: new Date('2023-03-27T13:00:00+09:00'),
    emojiUnicode: '1f9d1',
    name: '吉田 茂',
    kana: 'ヨシダ シゲル',
    displayName: null,
    sex: 'MALE',
    level: 'BEGINNER',
    note: '毎月第３土曜日は仕事のため欠席。',
  },
  {
    id: 4,
    createdAt: new Date('2023-04-30T13:00:00+09:00'),
    updatedAt: new Date('2023-04-30T13:00:00+09:00'),
    emojiUnicode: '1f9d1',
    name: '高橋 ゆかり',
    kana: 'タカハシ ユカリ',
    displayName: 'ユカリ',
    sex: 'FEMALE',
    level: 'ADVANCED',
    note: null,
  },
];
