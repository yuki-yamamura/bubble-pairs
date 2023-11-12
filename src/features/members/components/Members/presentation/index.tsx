import FunctionButton from '@/features/members/components/FunctionButton';
import MemberList from '@/features/members/components/MemberList';
import SortModal from '@/features/members/components/modals/SortModal';

import type { Options } from '@/components/RadioGroup';
import type { Inputs } from '@/features/members/components/modals/SortModal';
import type { SortKey } from '@/features/members/types/SortKey';
import type { Member } from '@prisma/client';
import type { SubmitHandler } from 'react-hook-form';

type Props = {
  isError: boolean;
  isLoading: boolean;
  members: Member[];
  options: Options;
  selectedSortKey: SortKey;
  onSubmit: SubmitHandler<Inputs>;
  isSortModalOpen: boolean;
  onSortModalToggle: () => void;
};
const Component = ({
  isError,
  isLoading,
  members,
  options,
  selectedSortKey,
  onSubmit,
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
        <SortModal
          title="並び替え"
          options={options}
          selectedSortKey={selectedSortKey}
          onSubmit={onSubmit}
          onCloseButtonClick={onSortModalToggle}
        />
      )}
    </>
  );
};

export default Component;
