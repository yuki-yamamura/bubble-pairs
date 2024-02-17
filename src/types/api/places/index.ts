import type { Place } from '@prisma/client';

export type GetResponseData = {
  places: Place[];
};

export type PostResponseData = {
  place: Place;
};
