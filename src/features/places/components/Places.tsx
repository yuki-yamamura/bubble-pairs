import DefaultPlaceSection from './DefaultPlaceSection';
import EmptyState from '@/components/EmptyState';
import Loading from '@/components/Loading';
import PlusButton from '@/components/PlusButton';
import SectionCard from '@/components/SectionCard';
import PlaceTable from '@/features/places/components/PlacesTable';
import { usePlaces } from '@/features/places/hooks/usePlaces';
import axios from 'axios';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

import type { Place } from '@prisma/client';

const Places = () => {
  const router = useRouter();
  const { places, isLoading, mutate } = usePlaces();

  const handlePlusButtonClick = async () => {
    await router.push('/settings/places/new');
  };

  const deletePlace = async (place: Place) => {
    try {
      await axios.put(`/api/places/${place.id}`, {
        ...place,
        isDeleted: true,
      });
      await mutate();
      toast.success('場所を削除しました。');
    } catch {
      toast.error('場所を削除できませんでした。');
    }
  };
  const openPlaceDetail = async (placeId: Place['id']) => {
    await router.push(`/settings/places/${placeId}`);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <PlusButton onClick={handlePlusButtonClick} />
      {places.length === 0 ? (
        <SectionCard title="場所">
          <EmptyState src="/images/building.png" alt="building">
            <div className="text-center text-sm leading-7">
              <p>場所を登録しましょう。</p>
              <p>画面左下にある「+」ボタンを押してください。</p>
            </div>
          </EmptyState>
        </SectionCard>
      ) : (
        <div>
          <h2 id="places" className="mb-4">
            場所
          </h2>
          <div className="flex flex-col gap-y-12">
            <PlaceTable
              data={places}
              actions={[deletePlace, openPlaceDetail]}
            />
            {places.length > 0 && <DefaultPlaceSection />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Places;
