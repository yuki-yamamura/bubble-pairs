type Props = React.ComponentPropsWithoutRef<'button'>;

const ApplyButton = (props: Props) => (
  <button type="submit" form="sort-members-form" {...props}>
    適用
  </button>
);

export default ApplyButton;
