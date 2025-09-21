import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';

import modalOverlayStyles from './modal-overlay.module.css';

export default function ModalOverlay({ children, onClick }) {
  const refOverlay = useRef(null);

  useEffect(() => {
    const handleOverlayClick = (e) => {
      if (e.target instanceof Node && e.target === refOverlay.current) {
        onClick?.();
      }
    };
    window.addEventListener('click', handleOverlayClick);
    return () => {
      window.removeEventListener('click', handleOverlayClick);
    };
  }, [onClick]);

  return (
    <div ref={refOverlay} className={modalOverlayStyles.modalOverlay}>
      {children}
    </div>
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  onClick: PropTypes.func.isRequired,
};
