import Loading from '@/components/Loading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import PlaceTable from '@/features/places/components/PlacesTable';
import { usePlaces } from '@/features/places/hooks/usePlaces';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

import type { Place } from '@prisma/client';

const PlaceSection = () => {
  const { places, isLoading: placesLoading, mutate } = usePlaces();
  const router = useRouter();

  const deletePlace = async (placeId: Place['id']) => {
    await axios.delete(`/api/places/${placeId}`);
    await mutate();
  };
  // eslint-disable-next-line @typescript-eslint/require-await
  const openPlaceDetail = async (placeId: Place['id']) => {
    await router.push(`/settings/places/${placeId}`);
  };

  if (placesLoading) {
    return <Loading />;
  }

  return (
    <section id="places">
      <h2>場所</h2>
      <Button asChild>
        <Link href={'/settings/places/new'}>場所を追加</Link>
      </Button>
      <PlaceTable data={places} actions={{ deletePlace, openPlaceDetail }} />
      <Separator className="mt-8" />
    </section>
  );
};

export default PlaceSection;
