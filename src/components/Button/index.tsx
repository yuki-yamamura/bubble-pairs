type Props = React.ComponentPropsWithoutRef<'button'> & {
  text: string;
  color: 'green' | 'red';
};

const Button = ({ text, color, ...rest }: Props) => (
  // todo: change button styles if disabled.
  <button data-color={color} {...rest}>
    {text}
  </button>
);

export default Button;
