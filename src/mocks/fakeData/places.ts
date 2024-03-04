import type { Place } from '@prisma/client';

export const fakePlaces: Place[] = [
  {
    id: '1',
    ownerId: 'clrcnez7q000108l6gb34bi8b',
    createdAt: new Date('2023-02-02T13:00:00+09:00'),
    updatedAt: new Date('2023-02-02T13:00:00+09:00'),
    name: 'A アリーナ',
    courtCount: 4,
    isDeleted: false,
  },
  {
    id: '2',
    ownerId: 'clrcnez7q000108l6gb34bi8b',
    createdAt: new Date('2023-02-03T13:00:00+09:00'),
    updatedAt: new Date('2023-02-03T13:00:00+09:00'),
    name: 'B 小学校',
    courtCount: 2,
    isDeleted: false,
  },
  {
    id: '3',
    ownerId: 'clrcnez7q000108l6gb34bi8b',
    createdAt: new Date('2023-02-03T13:00:00+09:00'),
    updatedAt: new Date('2023-02-03T13:00:00+09:00'),
    name: 'C 体育館',
    courtCount: 1,
    isDeleted: false,
  },
];
