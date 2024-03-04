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

  const deletePlaceById = async (placeId: Place['id']) => {
    try {
      await axios.delete(`/api/places/${placeId}`);
      await mutate();
      toast.success('活動場所を削除しました。');
    } catch {
      toast.error('活動場所を削除できませんでした。');
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
        <SectionCard title="活動場所">
          <EmptyState src="/images/building.png" alt="building">
            <div className="text-center text-sm leading-7">
              <p>活動場所を登録しましょう。</p>
              <p>画面左下にある「+」ボタンを押してください。</p>
            </div>
          </EmptyState>
        </SectionCard>
      ) : (
        <div>
          <h2 id="places" className="mb-4">
            活動場所
          </h2>
          <PlaceTable
            data={places}
            actions={{ deletePlaceById, openPlaceDetail }}
          />
        </div>
      )}
    </div>
  );
};

export default Places;
