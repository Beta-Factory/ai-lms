import CreateAgentPage from "@/app/create-agent/page";

import AgentsList from "@/lib/features/ai-agents/ai-agents";
import AgentsTopPage from "./ui/AgentsTopPage";

const AgentsPage = () => {
  return (
    <>
      <div className="flex w-[75%] flex-row border border-green-500">
        <AgentsTopPage />

        {/* {agentList.length === 0 ? <CreateAgentPage /> : <AgentsTopPage />} */}
      </div>
    </>
  );
};

export default AgentsPage;
