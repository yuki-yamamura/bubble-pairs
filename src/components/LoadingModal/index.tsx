import Loading from '@/components/Loading';
import Modal from '@/components/Modal';
import { useEffect, useRef } from 'react';

const LoadingModal = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
    const copiedRef = dialogRef.current;

    return () => copiedRef?.close();
  }, []);

  return (
    <Modal ref={dialogRef}>
      <Loading />
    </Modal>
  );
};

export default LoadingModal;
