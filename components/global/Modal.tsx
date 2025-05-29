"use client";
import React from "react";
import { twMerge } from "tailwind-merge";
import Button from "./Button";

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
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div
          className={twMerge(
            "bg-white rounded-lg shadow-lg max-w-md w-full",
            "dark:bg-gray-800 dark:border dark:border-gray-700"
          )}
        >
          <header className="flex justify-between items-center border-b border-gray-200 p-4 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </h3>
            <Button
              onClick={onClose}
              buttonType="ghost"
              aria-label="Close modal"
              classNames="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              onlyIcon={true}
              leftIcon={
                <span aria-hidden="true" className="text-xl leading-none">
                  &times;
                </span>
              }
            />
          </header>
          <div className="p-4 text-gray-900 dark:text-gray-100">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
