"use client";
import React from "react";
import { twMerge } from "tailwind-merge";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, children, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div
          className={twMerge("bg-white rounded-lg shadow-lg max-w-md w-full")}
        >
          <header className="flex justify-between items-center border-b border-gray-200 p-4">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button
              aria-label="Close modal"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              &#x2715;
            </button>
          </header>
          <div className="p-4">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
