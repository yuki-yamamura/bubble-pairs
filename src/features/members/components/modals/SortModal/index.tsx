import ApplyButton from '../ApplyButton';
import CloseButton from '../CloseButton';
import Modal from '@/components/Modal';
import { useForm } from 'react-hook-form';

import type { Options } from '@/components/RadioGroup';
import type { SortKey } from '@/features/members/types/SortKey';
import type { SubmitHandler } from 'react-hook-form';

import styles from './index.module.scss';

export type Inputs = {
  sortKey: SortKey;
};

type Props = {
  title: string;
  options: Options;
  selectedSortKey: SortKey;
  onSubmit: SubmitHandler<Inputs>;
  onCloseButtonClick: () => void;
};

const FunctionModal = ({
  title,
  options,
  selectedSortKey,
  onCloseButtonClick,
  onSubmit,
}: Props) => {
  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: { sortKey: selectedSortKey },
  });

  return (
    <Modal>
      <header className={styles.header}>
        <CloseButton onClick={onCloseButtonClick} />
        <div>{title}</div>
        <ApplyButton form="sort-members-form" />
      </header>
      <form
        id="sort-members-form"
        onSubmit={handleSubmit(onSubmit)}
        role="form"
      >
        {options.map(({ label, value }) => (
          <label key={value}>
            <input type="radio" value={value} {...register('sortKey')} />
            {label}
          </label>
        ))}
      </form>
    </Modal>
  );
};

export default FunctionModal;
