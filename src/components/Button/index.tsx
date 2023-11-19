import styles from './index.module.scss';

type Props = React.ComponentPropsWithoutRef<'button'> & {
  text: string;
  color: 'green' | 'red';
};

const Button = ({ text, color, ...rest }: Props) => (
  <button {...rest} data-color={color} className={styles.module}>
    {text}
  </button>
);

export default Button;
