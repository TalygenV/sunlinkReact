import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, maxWidth = "max-w-4xl" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-6 z-50">
      <div className={`relative bg-gray-400 rounded-lg w-full ${maxWidth} aspect-square flex items-center justify-center text-white text-3xl`}>
        {children}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-600 hover:bg-gray-700 rounded p-2"
          title="Close"
        >
          <X className="h-6 w-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default Modal;