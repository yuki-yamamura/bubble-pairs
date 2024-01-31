import Button from '@/components/Button';
import Textbox from '@/components/Textbox';
import CourtCountInput from '@/features/places/components/CourtCountInput';
import { usePlaceForm } from '@/features/places/hooks/usePlaceForm';

import type { PlaceFormType } from '@/features/places/validation';

type Props = {
  defaultValues: PlaceFormType;
  submitButtonLabel: string;
  submitPlace: (fieldValues: PlaceFormType) => void;
};

const BasePlaceForm = ({
  defaultValues,
  submitButtonLabel,
  submitPlace,
}: Props) => {
  const { fieldValues, fieldErrors, getValues, submitHandler, useFormReturn } =
    usePlaceForm(defaultValues);
  const handleSubmit = submitHandler(
    (fieldValues) => void submitPlace(fieldValues),
  );
  const isSubmitButtonDisabled = Object.is(defaultValues, getValues());

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>場所名（必須）</span>
        <Textbox defaultValue={defaultValues.name} {...fieldValues.name} />
      </label>
      {fieldErrors.name && <div role="alert">{fieldErrors.name.message}</div>}
      <fieldset>
        <legend>コート数</legend>
        <CourtCountInput useFormReturn={useFormReturn} />
        {fieldErrors.courtCount && (
          <div role="alert">{fieldErrors.courtCount.message}</div>
        )}
      </fieldset>
      <div>
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

export default BasePlaceForm;
