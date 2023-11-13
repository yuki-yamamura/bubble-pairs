import FunctionButton from '@/features/members/components/FunctionButton';
import MemberList from '@/features/members/components/MemberList';
import FilterModal from '@/features/members/components/modals/FilterModal';
import SortModal from '@/features/members/components/modals/SortModal';

import type { Options } from '@/components/RadioGroup';
import type { Inputs as FilterFormInputs } from '@/features/members/components/modals/FilterModal';
import type { Inputs as SortFormInputs } from '@/features/members/components/modals/SortModal';
import type { SortKey } from '@/features/members/types/SortKey';
import type { Level, Member, Sex } from '@prisma/client';
import type { SubmitHandler } from 'react-hook-form';

type Props = {
  isError: boolean;
  isLoading: boolean;
  members: Member[];
  options: Options;
  sexOptions: Options;
  levelOptions: Options;
  selectedSortKey: SortKey;
  selectedSex: Sex[];
  selectedLevels: Level[];
  onSortFormSubmit: SubmitHandler<SortFormInputs>;
  onFilterFormSubmit: SubmitHandler<FilterFormInputs>;
  isSortModalOpen: boolean;
  isFilterModalOpen: boolean;
  onSortModalToggle: () => void;
  onFilterModalToggle: () => void;
};
const Component = ({
  isError,
  isLoading,
  members,
  options,
  sexOptions,
  levelOptions,
  selectedSortKey,
  selectedSex,
  selectedLevels,
  onSortFormSubmit,
  onFilterFormSubmit,
  isSortModalOpen,
  isFilterModalOpen,
  onSortModalToggle,
  onFilterModalToggle,
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
      <FunctionButton label="絞り込み" onClick={onFilterModalToggle} />
      <MemberList members={members} />
      {isSortModalOpen && (
        <SortModal
          title="並び替え"
          options={options}
          selectedSortKey={selectedSortKey}
          onSubmit={onSortFormSubmit}
          onCloseButtonClick={onSortModalToggle}
        />
      )}
      {isFilterModalOpen && (
        <FilterModal
          title="絞り込み"
          sexOptions={sexOptions}
          levelOptions={levelOptions}
          selectedSex={selectedSex}
          selectedLevel={selectedLevels}
          onSubmit={onFilterFormSubmit}
          onCloseButtonClick={onFilterModalToggle}
        />
      )}
    </>
  );
};

export default Component;
