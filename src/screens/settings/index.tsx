import PageContainer from '@/components/PageContainer';
import Places from '@/features/places/components/Places';
import Profile from '@/features/users/components/Profile';

const SettingsScreen = () => (
  <PageContainer title="Settings">
    <div className="flex flex-col gap-y-16">
      <section id="places">
        <Places />
      </section>
      <section id="account">
        <Profile />
      </section>
    </div>
  </PageContainer>
);

export default SettingsScreen;
