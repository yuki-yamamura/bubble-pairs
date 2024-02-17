import type { Activity } from '@/types/models/Activity';

export type GetResponseData = {
  activities: Activity[];
};

export type PostResponseData = {
  activity: Activity;
};
