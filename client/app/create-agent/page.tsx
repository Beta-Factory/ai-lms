import AgentCreator from "@/components/AgentCreator";
import SideBarSection from "@/components/SidebarSection";

const CreateAgentPage = () => {
  return (
    <>
      <div className="flex flex-row gap-10">
        <SideBarSection />
        <AgentCreator />
      </div>
    </>
  );
};
export default CreateAgentPage;
