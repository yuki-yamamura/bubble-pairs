import { usePlaceForm } from '../../hooks/usePlaceForm';
import Button from '@/components/Button';
import Textbox from '@/components/Textbox';

import type { PlaceFormType } from '@/features/places/validation';

import styles from './index.module.scss';

type Props = {
  defaultValues: PlaceFormType;
  submitButtonLabel: string;
  submitPlace: (fieldValues: PlaceFormType) => void;
};

const PlaceForm = ({
  defaultValues,
  submitButtonLabel,
  submitPlace,
}: Props) => {
  const { fieldValues, fieldErrors, getValues, submitHandler } =
    usePlaceForm(defaultValues);
  const handleSubmit = submitHandler(
    (fieldValues) => void submitPlace(fieldValues),
  );
  const isSubmitButtonDisabled = Object.is(defaultValues, getValues());

  return (
    <form onSubmit={handleSubmit} className={styles.module}>
      <label className={styles.field}>
        <span className={styles.label}>場所名</span>
        <Textbox {...fieldValues.name} />
        {fieldErrors.name && (
          <div role="alert" className={styles.alert}>
            {fieldErrors.name.message}
          </div>
        )}
      </label>
      <label className={styles.field}>
        {/* todo: replace textbox with number input component */}
        <span className={styles.label}>コート数</span>
        <Textbox {...fieldValues.courtCount} />
      </label>
      <label className={styles.field}>
        {/* todo: replace checkbox with toggle button */}
        <span className={styles.label}>既定として使う</span>
        <input type="checkbox" {...fieldValues.isDefault} />
      </label>
      <div className={styles.submitButtonContainer}>
        <Button
          type="submit"
          text={submitButtonLabel}
          color="green"
          disabled={isSubmitButtonDisabled}
        />
      </div>
    </form>
  );
};

export default PlaceForm;
