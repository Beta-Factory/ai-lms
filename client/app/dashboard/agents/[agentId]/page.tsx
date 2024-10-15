"use client";

import ChatUI from "@/components/chatScreen/ChatUI";
import { SideBarMain } from "@/components/sideBar/SideBarMain";
import Hamburger from "@/components/ui/Hamburger";

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
