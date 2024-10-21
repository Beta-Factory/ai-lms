// import { Sidebar } from "lucide-react";

import AgentsPage from "@/components/agentsListPage/AgentsPage";
import { SideBarMain } from "@/components/sideBar/SideBarMain";

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
