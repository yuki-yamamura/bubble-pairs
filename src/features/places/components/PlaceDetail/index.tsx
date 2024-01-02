import Button from '@/components/Button';
import LoadingModal from '@/components/LoadingModal';
import PlaceDetailForm from '@/features/places/components/PlaceDetail/PlaceDetailForm';
import axios from 'axios';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import useSWRMutation from 'swr/mutation';

import type { Place } from '@prisma/client';

import styles from './index.module.scss';

type Props = {
  place: Place;
};

const PlaceDetail = ({ place }: Props) => {
  const router = useRouter();
  const { trigger, isMutating } = useSWRMutation(
    `/api/places/${place.id}`,
    async (url: string) => {
      await axios.delete(url);
    },
  );

  const handleDeleteButtonClick = () => {
    trigger()
      .then(() => {
        toast.success('場所を削除しました。');
        void router.push('/places');
      })
      .catch(() => toast.error('場所を削除できませんでした。'));
  };

  if (isMutating) {
    return <LoadingModal />;
  }

  return (
    <div className={styles.module}>
      <PlaceDetailForm place={place} />
      <div className={styles.submitButtonContainer}>
        <Button
          color="red"
          text="場所を削除"
          onClick={handleDeleteButtonClick}
        />
      </div>
    </div>
  );
};

export default PlaceDetail;
