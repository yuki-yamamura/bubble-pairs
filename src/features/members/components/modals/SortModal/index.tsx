import Modal from '@/components/Modal';
import RadioGroup from '@/components/RadioGroup';
import { forwardRef, useState } from 'react';

import type { SortKey } from '@/features/members/types/SortKey';
import type { Option } from '@/types/Option';

import styles from './index.module.scss';

export type FormValues = {
  sortKey: SortKey;
};

type Props = {
  title: string;
  description: string;
  options: Option[];
  initialSortKey: SortKey;
  selectSortKey: (sortKey: SortKey) => void;
  closeModal: () => void;
};

const SortModal = forwardRef<HTMLDialogElement, Props>(function SortModal(
  {
    title,
    description,
    options,
    initialSortKey,
    selectSortKey,
    closeModal,
  }: Props,
  ref,
) {
  const [selectedSortKey, setSelectedSortKey] =
    useState<SortKey>(initialSortKey);

  const handleApplyButtonClick = () => {
    selectSortKey(selectedSortKey);
    closeModal();
  };
  const handleCancelButtonClick = () => {
    closeModal();
  };
  const handleSortKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSortKey(e.currentTarget.value as SortKey);
  };

  return (
    <Modal ref={ref}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      <RadioGroup
        radioGroup="sort-key"
        selectedValue={selectedSortKey}
        options={options}
        onChange={handleSortKeyChange}
      />
      <div className={styles.buttons}>
        <button
          type="button"
          onClick={handleCancelButtonClick}
          className={styles.button}
        >
          キャンセル
        </button>
        <button
          type="submit"
          onClick={handleApplyButtonClick}
          className={styles.button}
        >
          適用
        </button>
      </div>
    </Modal>
  );
});

export default SortModal;
