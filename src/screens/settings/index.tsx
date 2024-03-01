import PageContainer from '@/components/PageContainer';
import Places from '@/features/places/components/Places';
import Profile from '@/features/users/components/Profile';

const SettingsScreen = () => (
  <PageContainer title="Settings">
    <div className="flex flex-col gap-y-16">
      <section id="places">
        <h2 id="places" className="mb-4">
          活動場所
        </h2>
        <Places />
      </section>
      <section id="account">
        <h2 id="account" className="mb-4">
          アカウント
        </h2>
        <Profile />
      </section>
    </div>
  </PageContainer>
);

export default SettingsScreen;
