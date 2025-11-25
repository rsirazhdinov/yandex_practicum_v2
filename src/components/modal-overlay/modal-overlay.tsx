import { useRef } from 'react';

import modalOverlayStyles from './modal-overlay.module.css';

type ModalOverlayProps = {
  children: React.JSX.Element;
  onClick: () => void;
};

export default function ModalOverlay({
  children,
  onClick,
}: ModalOverlayProps): React.JSX.Element {
  const refOverlay = useRef<HTMLDivElement | null>(null);

  const handleOverlayClick = (e: React.PointerEvent<HTMLDivElement>): void => {
    if (e.target instanceof Node && e.target === refOverlay.current) {
      onClick?.();
    }
  };

  return (
    <div
      data-testid="modal_overlay"
      onClick={handleOverlayClick}
      ref={refOverlay}
      className={modalOverlayStyles.modalOverlay}
    >
      {children}
    </div>
  );
}
