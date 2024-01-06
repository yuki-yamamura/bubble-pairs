import CheckboxGroup from '@/components/CheckboxGroup';
import FunctionModal from '@/features/members/components/FunctionModal';
import { useState } from 'react';

import type { Options } from '@/types/Options';
import type { Level, Sex } from '@prisma/client';
import type { Dispatch, RefObject, SetStateAction } from 'react';

import styles from './index.module.scss';

type Props = {
  levelOptions: Options<Level>;
  sexOptions: Options<Sex>;
  setSelectedLevels: Dispatch<SetStateAction<Level[]>>;
  setSelectedSexes: Dispatch<SetStateAction<Sex[]>>;
  dialogRef: RefObject<HTMLDialogElement>;
};

const FilterModal = ({
  levelOptions,
  sexOptions,
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
          <legend className={styles.legend}>性別</legend>
          <CheckboxGroup
            currentValues={currentSexes}
            defaultValue={[]}
            flexDirection="row"
            name="sex"
            options={sexOptions}
            onChange={handleSexesChange}
          />
        </fieldset>
        <fieldset>
          <legend className={styles.legend}>レベル</legend>
          <CheckboxGroup
            currentValues={currentLevels}
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
