import ActivityDetail from '@/features/activities/components/ActivityDetail';

type Props = {
  activity: ActivityDetail;
};

const ActivityDetailScreen = ({ activity }: Props) => (
  <div>
    <div>
      <ActivityDetail activity={activity} />
    </div>
  </div>
);

export default ActivityDetailScreen;
