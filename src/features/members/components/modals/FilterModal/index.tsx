import CheckboxGroup from '@/components/CheckboxGroup';
import FunctionModal from '@/features/members/components/FunctionModal';
import { levelOptions } from '@/features/members/constants/levelOptions';
import { sexOptions } from '@/features/members/constants/sexOptions';
import { useState } from 'react';

import type { Level, Sex } from '@prisma/client';
import type { Dispatch, RefObject, SetStateAction } from 'react';

import styles from './index.module.scss';

type Props = {
  setSelectedLevels: Dispatch<SetStateAction<Level[]>>;
  setSelectedSexes: Dispatch<SetStateAction<Sex[]>>;
  dialogRef: RefObject<HTMLDialogElement>;
};

const FilterModal = ({
  setSelectedLevels,
  setSelectedSexes,
  dialogRef,
}: Props) => {
  const [currentLevels, setCurrentLevels] = useState<Level[]>([]);
  const [currentSexes, setCurrentSexes] = useState<Sex[]>([]);

  const handleLevelsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentLevels((previousLevels) => {
      const changedLevel = e.target.value as Level;
      if (e.target.checked) {
        return [...previousLevels, changedLevel];
      }

      return previousLevels.filter((level) => level !== changedLevel);
    });
  };
  const handleSexesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentSexes((previousSexes) => {
      const changedSex = e.target.value as Sex;

      if (e.target.checked) {
        return [...previousSexes, changedSex];
      }

      return previousSexes.filter((sex) => sex !== changedSex);
    });
  };
  const handleApplyButtonClick = () => {
    setSelectedSexes(currentSexes);
    setSelectedLevels(currentLevels);
    dialogRef.current?.close();
  };
  const handleCancelButtonClick = () => {
    dialogRef.current?.close();
  };

  return (
    <FunctionModal
      description="選択した条件に合うメンバーを表示します。"
      title="絞り込み"
      onApplyButtonClick={handleApplyButtonClick}
      onCancelButtonClick={handleCancelButtonClick}
      ref={dialogRef}
    >
      <div className={styles.checkboxGroups}>
        <fieldset>
          <legend>性別</legend>
          <CheckboxGroup
            defaultValue={[]}
            flexDirection="row"
            name="sex"
            options={sexOptions}
            onChange={handleSexesChange}
          />
        </fieldset>
        <fieldset>
          <legend>レベル</legend>
          <CheckboxGroup
            defaultValue={[]}
            flexDirection="row"
            name="level"
            options={levelOptions}
            onChange={handleLevelsChange}
          />
        </fieldset>
      </div>
    </FunctionModal>
  );
};

export default FilterModal;
