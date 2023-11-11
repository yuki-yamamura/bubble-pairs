import styles from './index.module.scss';

export type Options = {
  label: string;
  value: string;
}[];

type Props = {
  options: Options;
};

const RadioGroup = ({ options }: Props) => (
  <div
    radioGroup="radio-buttons-group"
    role="radiogroup"
    className={styles.radioGroup}
  >
    {options.map(({ label, value }) => (
      <label key={value}>
        <input type="radio" name="radio-group" value={value} />
        {label}
      </label>
    ))}
  </div>
);

export default RadioGroup;
