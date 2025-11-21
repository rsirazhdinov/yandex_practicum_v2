import { BurgerOrderDetail } from '@/components/burger-order-detail/burger-order-detail';
import Modal from '@/components/modal/modal';
import { useNavigate, useParams } from 'react-router-dom';

import type React from 'react';

export const ModalFeed = (): React.JSX.Element => {
  const { number } = useParams();
  const header = '#' + number;
  const navigate = useNavigate();

  const onClose = (): void => {
    navigate(-1);
  };

  return (
    <Modal header={header} onClose={onClose}>
      <BurgerOrderDetail />
    </Modal>
  );
};
