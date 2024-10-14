"use client";

import ChatUI from "@/components/chatScreen/ChatUI";
import { SideBarMain } from "@/components/sideBar/SideBarMain";
import Hamburger from "@/components/ui/Hamburger";
import { useEffect, useState } from "react";

const ChatUIPage = () => {
  return (
    <>
      <div className="flex flex-row max-md:flex-col gap-10 w-full">
        {/* sidebar logic begin */}
        <div>
          <div className="max-md:hidden">
            <SideBarMain />
          </div>
          <div className="hidden max-md:flex w-[100%] justify-start mt-5 fixed">
            <Hamburger />
          </div>
        </div>
        {/* sidebar logic end */}
        <ChatUI />
      </div>
    </>
  );
};
export default ChatUIPage;
