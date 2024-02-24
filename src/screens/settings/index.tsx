import PageContainer from '@/components/PageContainer';
import Places from '@/features/places/components/Places';
import DeleteButton from '@/features/users/components/DeleteButton';
import Profile from '@/features/users/components/Profile';

const SettingsScreen = () => (
  <PageContainer title="Settings">
    <div className="flex flex-col gap-y-16">
      <section>
        <h2 id="places" className="mb-4">
          活動場所
        </h2>
        <Places />
      </section>
      <section>
        <h2 id="account" className="mb-4">
          アカウント
        </h2>
        <Profile />
        <div className="mt-20 flex justify-center">
          <DeleteButton className="self-center" />
        </div>
      </section>
    </div>
  </PageContainer>
);

export default SettingsScreen;
