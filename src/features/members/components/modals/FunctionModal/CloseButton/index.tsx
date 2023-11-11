type Props = React.ComponentPropsWithoutRef<'button'>;

const CloseButton = (props: Props) => (
  <button type="button" aria-label="close-modal" {...props}>
    キャンセル
  </button>
);

export default CloseButton;
