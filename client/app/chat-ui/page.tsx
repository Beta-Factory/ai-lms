import ChatUI from "@/components/ChatUI";
import SideBarSection from "@/components/SidebarSection";

const ChatUIPage = () => {
  return (
    <>
      <div className="flex flex-row gap-10">
        <SideBarSection />
        <ChatUI />
      </div>
    </>
  );
};
export default ChatUIPage;
