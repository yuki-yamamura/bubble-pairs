import PlaceDetail from '@/features/places/components/PlaceDetail';

import type { Place } from '@prisma/client';

type Props = {
  place: Place;
};

const PlaceScreen = ({ place }: Props) => (
  <>
    <h1>サイト 詳細</h1>
    <PlaceDetail place={place} />
  </>
);

export default PlaceScreen;
