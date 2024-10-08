import ChatUI from "@/components/chatScreen/ChatUI";
import { SideBarMain } from "@/components/sideBar/SideBarMain";

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
