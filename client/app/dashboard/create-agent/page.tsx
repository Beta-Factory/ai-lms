"use client";

import AgentCreator from "@/components/agentsCreatorPage/AgentCreator";
import { SideBarMain } from "@/components/sideBar/SideBarMain";
import Hamburger from "@/components/ui/Hamburger";
import { useEffect, useState } from "react";

const CreateAgentPage = () => {
  return (
    <>
      <div className="">
        <AgentCreator />
      </div>
    </>
  );
};
export default CreateAgentPage;
