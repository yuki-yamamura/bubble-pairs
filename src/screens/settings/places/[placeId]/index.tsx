import PageContainer from '@/components/PageContainer';
import PlaceDetail from '@/features/places/components/PlaceDetail';

import type { Place } from '@prisma/client';

type Props = {
  place: Place;
};
const PlaceDetailScreen = ({ place }: Props) => (
  <PageContainer title="Settings">
    <PlaceDetail place={place} />
  </PageContainer>
);

export default PlaceDetailScreen;
