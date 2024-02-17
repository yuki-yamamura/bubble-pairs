import PageContainer from '@/components/PageContainer';
import PlaceSection from '@/features/settings/components/PlaceSection';
import UserSection from '@/features/settings/components/UserSection';

const SettingsScreen = () => (
  <PageContainer>
    <PlaceSection />
    <UserSection />
  </PageContainer>
);

export default SettingsScreen;
