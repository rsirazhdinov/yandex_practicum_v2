import Modal from '@/components/modal/modal';
import { useNavigate } from 'react-router-dom';

import IngredientDetails from '@components/ingredient-details/ingredient-details.jsx';

import type React from 'react';

export const ModalIngredient = (): React.JSX.Element => {
  const header = 'Детали ингредиента';
  const navigate = useNavigate();

  const onClose = (): void => {
    navigate(-1);
  };

  return (
    <Modal header={header} onClose={onClose}>
      <IngredientDetails />
    </Modal>
  );
};
