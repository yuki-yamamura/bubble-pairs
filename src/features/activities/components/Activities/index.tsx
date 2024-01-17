import NewActivityButton from '@/features/activities/components/NewActivityButton';
import { useRouter } from 'next/router';

const Activities = () => {
  const router = useRouter();

  const handleNewActivityButtonClick = () => {
    void router.push('/activities/new');
  };

  return (
    <div>
      <div>something</div>
      <NewActivityButton onClick={handleNewActivityButtonClick} />
    </div>
  );
};

export default Activities;
