import NewMemberForm from '../../NewMemberForm';
import Modal from '@/components/Modal';

import type { Member } from '@prisma/client';
import type { SubmitHandler } from 'react-hook-form';

import styles from './index.module.scss';

const NewMemberModal = () => {
  return (
    <Modal>
      <header className={styles.header}>
        <div>チームにメンバーを追加する</div>
      </header>
      <NewMemberForm
        onSubmit={
          (() => {
            console.log('this is a dummy func.');
          }) as SubmitHandler<
            Omit<Member, 'id' | 'createdAt' | 'updatedAt' | 'avatar'>
          >
        }
      />
    </Modal>
  );
};

export default NewMemberModal;
