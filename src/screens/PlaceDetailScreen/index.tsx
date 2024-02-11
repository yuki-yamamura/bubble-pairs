import PlaceDetail from '@/features/places/components/PlaceDetail';

import type { Place } from '@prisma/client';

type Props = {
  place: Place;
};

const PlaceDetailScreen = ({ place }: Props) => <PlaceDetail place={place} />;

export default PlaceDetailScreen;
