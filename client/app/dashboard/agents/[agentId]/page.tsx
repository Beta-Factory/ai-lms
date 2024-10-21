"use client";

import ChatUI from "@/components/chatScreen/ChatUI";

const ChatUIPage = () => {
  return (
    <>
      <div>
        <div className="flex flex-row max-md:flex-col gap-10 w-full">
          <ChatUI />
        </div>
      </div>
    </>
  );
};
export default ChatUIPage;
