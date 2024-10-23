// import { Sidebar } from "lucide-react";
"use client";

import AgentsPage from "@/components/agentsListPage/AgentsPage";
import { SideBarMain } from "@/components/sideBar/SideBarMain";

const TopPageLayout = () => {
  return (
    <div className="lg:ml-20">
      <AgentsPage />
    </div>
  );
};

export default TopPageLayout;
