import PageContainer from '@/components/PageContainer';
import MemberList from '@/features/members/components/MemberList';

const MembersScreen = () => {
  return (
    <PageContainer>
      <main>
        <header className="mb-6 mt-2 text-xl  font-light sm:mb-20">
          <h1>Members</h1>
        </header>
        <MemberList />
      </main>
    </PageContainer>
  );
};

export default MembersScreen;
