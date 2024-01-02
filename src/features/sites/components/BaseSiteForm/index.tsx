import Button from '@/components/Button';
import Textbox from '@/components/Textbox';
import { useSiteForm } from '@/features/sites/hooks/useSiteForm';

import type { SiteFormType } from '@/features/sites/validation';

import styles from './index.module.scss';

type Props = {
  defaultValues: SiteFormType;
  submitButtonLabel: string;
  submitSite: (fieldValues: SiteFormType) => void;
};

const SiteForm = ({ defaultValues, submitButtonLabel, submitSite }: Props) => {
  const { fieldValues, fieldErrors, getValues, submitHandler } =
    useSiteForm(defaultValues);
  const handleSubmit = submitHandler((fieldValues) => submitSite(fieldValues));
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

export default SiteForm;
