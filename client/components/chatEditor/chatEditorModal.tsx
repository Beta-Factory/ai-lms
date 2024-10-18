"use client";

import { MouseEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { replaceMessage } from "../../lib/features/ai-chats/ai-chat-Slice";

type ChatEditorModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: { index: number; message: Message };
};

const ChatEditorModal = ({
  isOpen,
  onClose,
  title,
  children,
}: ChatEditorModalProps) => {
  const {
    index,
    message: { message: messageString },
  } = children;

  const [content, setContent] = useState(messageString);
  const dispatch = useDispatch();

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setContent(value);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSave(event as any);
    }
  };

  const handleSave = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClose();
    const payload = {
      index,
      message: { ...children.message, message: content },
    };
    dispatch(replaceMessage(payload));
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
          {/* <Input
            className="mt-4 h-40 overflow-y-auto"
            value={content}
            onChange={handleInput}
          /> */}
          <textarea
            className="mt-4 h-40 w-full overflow-y-auto p-2 border rounded"
            value={content}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
          />

          <div className="flex justify-between text-sm font-semibold">
            <button
              onClick={handleSave}
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
