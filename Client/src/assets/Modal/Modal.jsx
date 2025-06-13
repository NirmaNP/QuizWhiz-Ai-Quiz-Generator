import React, { useEffect, useState } from 'react';
import './Modal.css';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  closeOnOverlayClick = true,
  showCloseButton = true,
  width = '600px',
  maxHeight = '80vh',
}) => {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [animateClass, setAnimateClass] = useState('');

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => setAnimateClass('fade-in'), 10); // Delay to trigger animation
      document.body.style.overflow = 'hidden';
    } else {
      setAnimateClass('fade-out');
      document.body.style.overflow = 'auto';

      const timeout = setTimeout(() => setShouldRender(false), 300); // match CSS duration
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!shouldRender) return null;

  return (
    <div
      className={`reusable-modal-overlay ${animateClass}`}
      onClick={closeOnOverlayClick ? onClose : undefined}
    >
      <div
        className="reusable-modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ width, maxHeight }}
      >
        <div className="reusable-modal-header">
          <h2 className="text-xl font-bold">{title}</h2>
          {showCloseButton && (
            <button className="reusable-modal-close" onClick={onClose}>
              &times;
            </button>
          )}
        </div>
        <div className="reusable-modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
