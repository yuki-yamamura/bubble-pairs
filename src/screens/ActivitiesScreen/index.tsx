import Activities from '@/features/activities/components/Activities';

const ActivitiesScreen = () => (
  <div>
    <div>
      {/* todo: show empty state only if there's no activity. */}
      {/* <NoActivityFound /> */}
      <Activities />
    </div>
  </div>
);

export default ActivitiesScreen;
