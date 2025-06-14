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
      setTimeout(() => setAnimateClass('fade-in'), 10);
      document.body.style.overflow = 'hidden';
    } else {
      setAnimateClass('fade-out');
      document.body.style.overflow = 'auto';

      const timeout = setTimeout(() => setShouldRender(false), 300);
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
      className={`reusable-modal-overlay dark:bg-opacity-70 ${animateClass}`}
      onClick={closeOnOverlayClick ? onClose : undefined}
    >
      <div
        className="reusable-modal-content dark:bg-black"
        onClick={(e) => e.stopPropagation()}
        style={{ width, maxHeight }}
      >
        <div className="reusable-modal-header dark:border-gray-700">
          <h2 className="text-xl font-bold dark:text-gray-200">{title}</h2>
          {showCloseButton && (
            <button 
              className="reusable-modal-close dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-black/20" 
              onClick={onClose}
            >
              &times;
            </button>
          )}
        </div>
        <div className="reusable-modal-body dark:bg-black">{children}</div>
      </div>
    </div>
  );
};

export default Modal;