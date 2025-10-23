import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import IngredientDetails from '@components/ingredient-details/ingredient-details.jsx';
import ModalOverlay from '@components/modal-overlay/modal-overlay.jsx';

import type { KeyboardEvent } from 'react';

import modalStyles from '@components/modal/modal.module.css';

export const ModalIngredient = (): React.JSX.Element => {
  const header = 'Детали ингредиента';
  const navigate = useNavigate();

  const onClose = (): void => {
    navigate(-1);
  };
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return (): void => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <ModalOverlay onClick={onClose}>
      <div className={` ${modalStyles.modal_popup}`}>
        <div className={` pl-10 pt-10 pr-10 ${modalStyles.modal_header}`}>
          <p className="text text_type_main-large">{header}</p>
          <CloseIcon
            className={modalStyles.close_icon}
            type="primary"
            onClick={onClose}
          />
        </div>
        <div>
          <IngredientDetails />
        </div>
      </div>
    </ModalOverlay>
  );
};
