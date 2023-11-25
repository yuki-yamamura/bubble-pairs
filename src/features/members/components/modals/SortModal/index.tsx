import RadioGroup from '@/components/RadioGroup';
import FunctionModal from '@/features/members/components/FunctionModal';
import { useState } from 'react';

import type { SortKey } from '@/features/members/types/SortKey';
import type { Options } from '@/types/Options';
import type { Dispatch, RefObject, SetStateAction } from 'react';

type Props = {
  options: Options<SortKey>;
  setSelectedSortKey: Dispatch<SetStateAction<SortKey>>;
  dialogRef: RefObject<HTMLDialogElement>;
};

const SortModal = ({ options, setSelectedSortKey, dialogRef }: Props) => {
  const defaultSortKey = options[0].value;
  const [currentSortKey, setCurrentSortKey] = useState<SortKey>(defaultSortKey);

  const handleSortKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentSortKey(e.currentTarget.value as SortKey);
  };
  const handleApplyButtonClick = () => {
    setSelectedSortKey(currentSortKey);
    dialogRef.current?.close();
  };
  const handleCancelButtonClick = () => {
    dialogRef.current?.close();
  };

  return (
    <FunctionModal
      description="選択した項目の昇順にメンバーを並び替えます。"
      title="並び替え"
      onApplyButtonClick={handleApplyButtonClick}
      onCancelButtonClick={handleCancelButtonClick}
      ref={dialogRef}
    >
      <RadioGroup
        defaultValue={defaultSortKey}
        flexDirection="column"
        name="sort"
        options={options}
        onChange={handleSortKeyChange}
      />
    </FunctionModal>
  );
};

export default SortModal;
