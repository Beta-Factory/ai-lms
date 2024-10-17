"use client";

import ChatEditorModal from "./chatEditorModal";
import React, { useState } from "react";
import { Button } from "../ui/button";

const EditChat = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setIsModalOpen(true)}>Edit & Export</Button>

      <ChatEditorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edit This Message"
      >
        <p>Your modal content goes here</p>
      </ChatEditorModal>
    </div>
  );
};

export default EditChat;
