"use client";

import { ExChatState } from "@/lib/features/ai-export-chat/ai-export-chat-Slice";
import { useState } from "react";
import ChatEditorModal from "../chatEditor/chatEditorModal";
import { Button } from "../ui/button";

export const MyDocument = ({ document }: { document: ExChatState | null }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<ExChatState | null>(
    document
  );

  const handleEditbutton = () => {
    setShowModal(true);
  };
  return (
    <div>
      {showModal && (
        <ChatEditorModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Edit This Message"
        >
          {selectedMessage?.EXmessages!}
        </ChatEditorModal>
      )}

      <div className="mb-5 mt-5 p-4 border rounded-lg shadow-sm bg-white">
        <div className="mb-2">
          <h2 className={`text-2xl font-semibold text-blue-500`}>
            AI response
          </h2>
        </div>
        <div>
          <p className="text-lg text-gray-800">
            {selectedMessage?.EXmessages.message.message}
          </p>
        </div>
        <Button
          onClick={handleEditbutton}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
        />
      </div>
      {/* {chatsToRender.map((chat, index) => (
        <div
          key={index}
          className="mb-5 mt-5 p-4 border rounded-lg shadow-sm bg-white"
        >
          <div className="mb-2">
            <h2
              className={`text-2xl font-semibold ${
                chat.role == "ai" ? "text-blue-500" : "text-slate-700"
              }`}
            >
              {chat.role == "ai" ? "AI" : "User"}
            </h2>
          </div>
          <div>
            <p className="text-lg text-gray-800">{chat.message}</p>
          </div>
        </div>
      ))} */}
    </div>
  );
};
