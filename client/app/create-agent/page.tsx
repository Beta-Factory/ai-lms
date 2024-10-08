import AgentCreator from "@/components/agentsCreatorPage/AgentCreator";
import { SideBarMain } from "@/components/sideBar/SideBarMain";

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
