import { Edit, Sidebar } from "lucide-react";
import UserInfoCard from "./ui/UserInfoCard";
import ExploreAgentsCard from "./ui/ExploreAgentsCard";
import ChatHistory from "./ui/ChatHistory";
const SideBarSection = () => {
  return (
    <div className="bg-[#F5F5F5] w-[20%] h-[100vh]">
      <div className="w-[100%] flex  justify-between px-5 py-5">
        <Sidebar className="text-[#808080]" />
        <Edit className="text-[#808080]" />
      </div>

      {/* user info */}
      <UserInfoCard />

      {/* explore agents */}
      <ExploreAgentsCard />

      {/* chat history */}
      <ChatHistory
        chatHeading={`Email for Leave Application `}
        time={`today`}
      />
    </div>
  );
};
export default SideBarSection;
