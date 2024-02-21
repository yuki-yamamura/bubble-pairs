import { fakeMembers } from './members';
import { fakePlaces } from './places';

import type { Activity } from '@/types/models/Activity';

export const fakeActivities: Activity[] = [
  {
    id: '1',
    ownerId: 'clrcnez7q000108l6gb34bi8b',
    placeId: fakePlaces[0].id,
    createdAt: new Date('2023-02-02T13:00:00+09:00'),
    isOpen: true,
    participants: [
      {
        id: '1',
        activityId: '1',
        memberId: fakeMembers[0].id,
        member: fakeMembers[0],
      },
      {
        id: '2',
        activityId: '1',
        memberId: fakeMembers[1].id,
        member: fakeMembers[1],
      },
      {
        id: '3',
        activityId: '1',
        memberId: fakeMembers[2].id,
        member: fakeMembers[2],
      },
      {
        id: '4',
        activityId: '1',
        memberId: fakeMembers[3].id,
        member: fakeMembers[3],
      },
      {
        id: '5',
        activityId: '1',
        memberId: fakeMembers[4].id,
        member: fakeMembers[4],
      },
    ],
    place: fakePlaces[0],
    games: [],
  },
];
