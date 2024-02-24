import Loading from '@/components/Loading';
import PlusButton from '@/components/PlusButton';
import PlaceTable from '@/features/places/components/PlacesTable';
import { usePlaces } from '@/features/places/hooks/usePlaces';
import axios from 'axios';
import { useRouter } from 'next/router';

import type { Place } from '@prisma/client';

const Places = () => {
  const { places, isLoading, mutate } = usePlaces();
  const router = useRouter();

  const handlePlusButtonClick = async () => {
    await router.push('/settings/places/new');
  };

  const deletePlaceById = async (placeId: Place['id']) => {
    await axios.delete(`/api/places/${placeId}`);
    await mutate();
  };
  const openPlaceDetail = async (placeId: Place['id']) => {
    await router.push(`/settings/places/${placeId}`);
  };

  if (isLoading) {
    return <Loading text="活動場所を読み込んでいます..." />;
  }

  return (
    <div>
      <PlusButton onClick={handlePlusButtonClick} />
      <PlaceTable
        data={places}
        actions={{ deletePlaceById, openPlaceDetail }}
      />
    </div>
  );
};

export default Places;
