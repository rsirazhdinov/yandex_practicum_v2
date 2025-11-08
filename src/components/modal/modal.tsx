import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { createPortal } from 'react-dom';

import ModalOverlay from '../modal-overlay/modal-overlay';

import modalStyles from './modal.module.css';

const ModalRoot = document.getElementById('react-modals') as HTMLElement;

type ModalProps = {
  header?: string;
  onClose: () => void;
  children: React.JSX.Element;
};

export default function Modal({
  header,
  onClose,
  children,
}: ModalProps): React.JSX.Element {
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

  return createPortal(
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
        <div>{children}</div>
      </div>
    </ModalOverlay>,
    ModalRoot
  );
}
