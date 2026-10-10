import React, { useEffect } from 'react';
import { MdClose } from 'react-icons/md';

const Modal = ({
  isOpen,
  onClose,
  icon,
  title,
  subtitle,
  children,
  maxWidth = 'max-w-lg',
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`bg-white rounded-2xl border border-slate-200/80 shadow-2xl w-full ${maxWidth} overflow-hidden transform transition-all duration-200 animate-in zoom-in-95 font-sans`}
      >
        {/* Unified Modal Header */}
        <div className="px-6 py-4.5 border-b border-slate-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 shadow-xs">
                {icon}
              </div>
            )}
            <div>
              <h3 className="text-[15px] font-semibold text-slate-900 tracking-tight leading-tight">
                {title}
              </h3>
              {subtitle && (
                <p className="text-[11px] text-slate-500 font-normal mt-0.5 leading-tight">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <MdClose size={18} />
          </button>
        </div>

        {/* Unified Modal Body */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
