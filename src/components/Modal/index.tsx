import { createPortal } from 'react-dom';

import styles from './index.module.scss';

type Props = {
  children: React.ReactNode;
};

const Modal = ({ children }: Props) =>
  createPortal(<div className={styles.module}>{children}</div>, document.body);

export default Modal;
