"use client";

import { useState } from "react";
import { Input } from "../ui/input";

type ChatEditorModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: string;
};

const ChatEditorModal = ({
  isOpen,
  onClose,
  title,
  children,
}: ChatEditorModalProps) => {
  const [content, setContent] = useState(children?.toString());

  const handleInput = (event: any) => {
    const value = event.target.value;
    setContent(value);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />

      {/* Modal */}
      <div className="relative z-50 w-full max-w-lg bg-white rounded-lg shadow-lg">
        <div className="p-4 flex flex-col h-auto">
          <h2 className="text-xl font-semibold">{title}</h2>
          <Input
            className="mt-4 h-40 overflow-y-auto"
            value={content}
            onChange={handleInput}
          />

          <div className="flex justify-between text-sm font-semibold">
            <button
              onClick={onClose}
              className="mt-4 btn btn-primary hover:bg-green-500 transition ease-in-out duration-200 rounded-md p-2"
            >
              save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatEditorModal;
