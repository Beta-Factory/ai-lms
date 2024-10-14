// import { Sidebar } from "lucide-react";
"use client";

import { SideBarMain } from "@/components/sideBar/SideBarMain";
import AgentsPage from "@/components/agentsListPage/AgentsPage";
import Hamburger from "@/components/ui/Hamburger";

import { useEffect, useState } from "react";

const TopPageLayout = () => {
  return (
    <div className="">
      <AgentsPage />
    </div>
  );
};

export default TopPageLayout;
