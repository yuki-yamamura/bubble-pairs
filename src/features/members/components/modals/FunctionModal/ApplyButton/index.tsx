type Props = React.ComponentPropsWithoutRef<'button'>;

const ApplyButton = (props: Props) => (
  <button type="button" aria-label="apply-sort-condition" {...props}>
    適用
  </button>
);

export default ApplyButton;
