"use client";

import ChatUI from "@/components/chatScreen/ChatUI";

const ChatUIPage = () => {
  return (
    <>
      <div className="flex flex-row max-md:flex-col gap-10 w-full">
        <ChatUI />
      </div>
    </>
  );
};
export default ChatUIPage;
