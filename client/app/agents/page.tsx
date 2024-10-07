// import { Sidebar } from "lucide-react";
import SideBarSection from "../../components/SidebarSection";
import AgentsPage from "../../components/AgentsPage";
import { Sidebar } from "@/components/ui/AnimatedSideBar";
import { SideBarMain } from "@/components/SideBar";

const TopPageLayout = () => {
  return (
    <div className="flex flex-row gap-10">
      {/* <SideBarSection /> */}
      <SideBarMain />
      <AgentsPage />
    </div>
  );
};

export default TopPageLayout;
