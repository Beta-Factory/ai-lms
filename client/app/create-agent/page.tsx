import AgentCreator from "@/components/AgentCreator";
import { SideBarMain } from "@/components/SideBar";
import SideBarSection from "@/components/SidebarSection";

const CreateAgentPage = () => {
  return (
    <>
      <div className="flex flex-row gap-10">
        {/* <SideBarSection /> */}
        <SideBarMain />
        <AgentCreator />
      </div>
    </>
  );
};
export default CreateAgentPage;
