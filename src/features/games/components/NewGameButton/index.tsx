import { FaPlay } from 'react-icons/fa';

type Props = React.ComponentPropsWithoutRef<'button'>;

const NewGameButton = (props: Props) => (
  <button type="button" {...props} aria-label="ゲームをはじめる">
    <FaPlay aria-hidden size={20} />
  </button>
);

export default NewGameButton;
