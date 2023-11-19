import type RadioGroup from './RadioGroup';
import type Textarea from './Textarea';
import type Textbox from './Textbox';

import styles from './index.module.scss';

type Props = {
  labelText: string;
  children: React.ReactElement<
    Parameters<typeof Textbox | typeof RadioGroup> | typeof Textarea
  >;
  errorMessage?: string;
};

const FormField = ({ labelText, children, errorMessage }: Props) => (
  <label className={styles.module}>
    <span className={styles.labelText}>{labelText}</span>
    {children}
    {errorMessage && (
      <div role="alert" className={styles.alert}>
        {errorMessage}
      </div>
    )}
  </label>
);

export default FormField;
