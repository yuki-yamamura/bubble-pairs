import ApplyButton from '../ApplyButton';
import CloseButton from '../CloseButton';
import Modal from '@/components/Modal';
import { levelOptions } from '@/features/members/constants/levelOptions';
import { sexOptions } from '@/features/members/constants/sexOptions';
import { useForm } from 'react-hook-form';

import type { Level, Sex } from '@prisma/client';
import type { SubmitHandler } from 'react-hook-form';

import styles from './index.module.scss';

export type Inputs = {
  sexes: Sex[];
  levels: Level[];
};

type Props = {
  title: string;
  selectedSex: Sex[];
  selectedLevel: Level[];
  onSubmit: SubmitHandler<Inputs>;
  onCloseButtonClick: () => void;
};

const FunctionModal = ({
  title,
  selectedSex,
  selectedLevel,
  onSubmit,
  onCloseButtonClick,
}: Props) => {
  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      sexes: selectedSex,
      levels: selectedLevel,
    },
  });

  return (
    <Modal>
      <header className={styles.header}>
        <CloseButton onClick={onCloseButtonClick} />
        <div>{title}</div>
        <ApplyButton form="filter-members-form" />
      </header>
      <form
        id="filter-members-form"
        // onSubmit={handleSubmit(onSubmit)}
        onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}
        role="form"
      >
        <fieldset className={styles.sexGroup}>
          <legend>性別</legend>
          {sexOptions.map(({ label, value }) => (
            <label key={value}>
              <input type="checkbox" value={value} {...register('sexes')} />
              {label}
            </label>
          ))}
        </fieldset>
        <fieldset className={styles.levelGroup}>
          <legend>レベル</legend>
          {levelOptions.map(({ label, value }) => (
            <label key={value}>
              <input type="checkbox" value={value} {...register('levels')} />
              {label}
            </label>
          ))}
        </fieldset>
      </form>
    </Modal>
  );
};

export default FunctionModal;
