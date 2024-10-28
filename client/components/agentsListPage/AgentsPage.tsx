"use client";

import AgentsTopPage from "../ui/AgentsTopPage";
import AgentCard from "../ui/AgentCard";
import { StaticImageData } from "next/image";
import Imageone from "@/app/assets/nature.jpg";
import { useGetAgentsQuery } from "@/lib/features/ai-agents/ai-agents-api";
import { AgentType } from "@/types/AI-Agents";

const AgentsPage = () => {
  const { data: agents, isError, isLoading, error } = useGetAgentsQuery({});
  const agentsData = agents?.response;
  if (agentsData) {
    console.log(agentsData); // ! debug
  }

  return (
    <>
      <div className="flex w-vw flex-col p-10">
        {/* top page heading, search etc. */}
        <AgentsTopPage />

        {isLoading && <div>Loading...</div>}

        {/* agent cards  will use map here over list of agents*/}
        <div className="w-full flex justify-center items-center flex-wrap">
          <div className=" flex lg:flex-row xs:flex-col justify-evenly  gap-5 w-full mt-10">
            {agentsData &&
              agentsData.length > 0 &&
              agentsData.map((agent: AgentType, index: number) => (
                <div
                  className="flex justify-start-start items-center space-x-4 mb-4"
                  key={index}
                >
                  <AgentCard
                    link={`/dashboard/agents/${agent.agentName}`}
                    name={agent.agentName}
                    description={agent.description}
                    imageUrl={Imageone as StaticImageData}
                  />
                </div>
              ))}
          </div>
          {isError && (
            <div>
              Error !! Something went wrong <p>{error.toString()}</p>
              <AgentCard
                link={`/dashboard/agents/default`}
                name="default name"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
                imageUrl={Imageone as StaticImageData}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AgentsPage;
