import RadioGroup from '@/components/RadioGroup';
import FunctionButton from '@/features/members/components/FunctionButton';
import MemberList from '@/features/members/components/MemberList';
import FunctionModal from '@/features/members/components/modals/FunctionModal';

import type { Options } from '@/components/RadioGroup';
import type { Member } from '@prisma/client';

type Props = {
  isError: boolean;
  isLoading: boolean;
  members: Member[];
  options: Options;
  isSortModalOpen: boolean;
  onSortModalToggle: () => void;
};
const Component = ({
  isError,
  isLoading,
  members,
  options,
  isSortModalOpen,
  onSortModalToggle,
}: Props) => {
  if (isLoading) {
    return <div>Loading members...</div>;
  }

  if (isError) {
    return <div>Something went wrong.</div>;
  }

  return (
    <>
      <h1>Members</h1>
      <FunctionButton label="並び替え" onClick={onSortModalToggle} />
      <MemberList members={members} />
      {isSortModalOpen && (
        <FunctionModal
          title="並び替え"
          // todo: replace a dummy func.
          onApplyButtonClick={() => console.log('this is a dummy func.')}
          onCloseButtonClick={onSortModalToggle}
        >
          <RadioGroup options={options} />
        </FunctionModal>
      )}
    </>
  );
};

export default Component;
