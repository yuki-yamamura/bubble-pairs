import { AiOutlineUserAdd } from 'react-icons/ai';

type Props = React.ComponentPropsWithoutRef<'button'>;

const NewMemberButton = (props: Props) => (
  <button type="button" {...props}>
    <AiOutlineUserAdd aria-label="add user" />
  </button>
);

export default NewMemberButton;
