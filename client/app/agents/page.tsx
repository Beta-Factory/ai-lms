// import { Sidebar } from "lucide-react";

import { Sidebar } from "@/components/ui/AnimatedSideBar";
import { SideBarMain } from "@/components/sideBar/SideBarMain";
import AgentsPage from "@/components/agentsListPage/AgentsPage";
import Hamburger from "@/components/ui/Hamburger";

const TopPageLayout = () => {
  return (
    <div className="flex flex-row gap-10 w-full">
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

      <AgentsPage />
    </div>
  );
};

export default TopPageLayout;
