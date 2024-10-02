// import { Sidebar } from "lucide-react";
import SideBarSection from "../../components/SidebarSection";
import AgentsPage from "../../components/AgentsPage";

const TopPageLayout = () => {
  return (
    <div className="flex flex-row gap-10">
      <SideBarSection />
      <AgentsPage />
    </div>
  );
};

export default TopPageLayout;
