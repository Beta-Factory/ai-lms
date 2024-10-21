import AgentCreator from "@/components/agentsCreatorPage/AgentCreator";
import { SideBarMain } from "@/components/sideBar/SideBarMain";
import Hamburger from "@/components/ui/Hamburger";

const CreateAgentPage = () => {
  return (
    <>
      <div className="flex flex-row gap-10 ">
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
         <div className="w-full flex justify-center items-center">
        <AgentCreator />
        </div>
      </div>
    </>
  );
};
export default CreateAgentPage;
