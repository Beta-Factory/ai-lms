import ChatUI from "@/components/ChatUI";
import { SideBarMain } from "@/components/SideBar";

const ChatUIPage = () => {
  return (
    <>
      <div className="flex flex-row gap-10">
        <SideBarMain />
        <ChatUI />
      </div>
    </>
  );
};
export default ChatUIPage;
