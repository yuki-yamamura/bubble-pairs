import { Button } from '@/components/ui/button';
import { Activity as ActivityDetail } from '@/types/models/Activity';
import Link from 'next/link';

type Props = {
  activity: ActivityDetail;
};
const ActivityDetail = ({ activity }: Props) => {
  return (
    <div>
      <Button asChild>
        <Link href={`/activities/${activity.id}/games/new`}>
          ゲームをはじめる
        </Link>
      </Button>
    </div>
  );
};

export default ActivityDetail;
