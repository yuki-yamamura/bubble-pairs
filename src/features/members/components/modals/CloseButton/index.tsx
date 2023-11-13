type Props = React.ComponentPropsWithoutRef<'button'>;

const CloseButton = (props: Props) => (
  <button type="button" {...props}>
    キャンセル
  </button>
);

export default CloseButton;
