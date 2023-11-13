type Props = React.ComponentPropsWithoutRef<'button'> & {
  form: string;
};

const ApplyButton = (props: Props) => (
  <button type="submit" {...props}>
    適用
  </button>
);

export default ApplyButton;
