"use client";

import { X } from "lucide-react";

type ChatEditorModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

const ChatEditorModal = ({
  isOpen,
  onClose,
  title,
  children,
}: ChatEditorModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-50 w-full max-w-lg bg-white rounded-lg shadow-lg">
        <div className="p-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <div className="mt-4">{children}</div>
          <button onClick={onClose} className="mt-4 btn btn-primary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatEditorModal;
