
import React from 'react';

const Modal = ({ isOpen, onClose, content, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white mx-3 rounded-lg p-6 xl:min-w-[300px] max-w-md md:mx-auto relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          &times;
        </button>
        <h2
          className="text-xl font-semibold  mb-4"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div
          className="modal-content h-[60vh] overflow-y-scroll content_Scroll"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};

export default Modal;
