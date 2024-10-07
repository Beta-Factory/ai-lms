"use client";

import CreateAgentPage from "@/app/create-agent/page";
import AgentsList from "@/lib/features/ai-agents/ai-agents";
import AgentsTopPage from "./ui/AgentsTopPage";
import AgentCard from "./ui/AgentCard";
import { StaticImageData } from "next/image";
import Imageone from "@/app/assets/nature.jpg";

import { useGetUsersQuery } from "@/lib/features/ai-agents/ai-agents-api";

const AgentsPage = () => {
  const { data, error, isLoading } = useGetUsersQuery();

  return (
    <>
      <div className="flex w-[75%] flex-row border border-green-500">
        <AgentsTopPage />
        {/* agent cards  will use map here over list of agents*/}
        <div className="w-full flex justify-center items-center flex-wrap">
          <div className=" flex lg:flex-row xs:flex-col justify-evenly  gap-5 w-full mt-10">
            <AgentCard
              name={`parwez`}
              description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                `}
              imageUrl={Imageone as StaticImageData}
            />

            {isLoading && <p>Loading ....</p>}
            {error && <p className="text-red-500">Something went wrong!</p>}

            {/* {data &&
              data.length > 0 &&
              data.map((item, index) => (
                <div
                  className="flex justify-start-start items-center space-x-4 mb-4"
                  key={index}
                >
                  <AgentCard
                    name={`${item.id} ${item.login}`}
                    description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                `}
                    imageUrl={item.avatar_url as unknown as StaticImageData}
                  />
                </div>
              ))} */}
          </div>
        </div>

        {/* {agentList.length === 0 ? <CreateAgentPage /> : <AgentsTopPage />} */}
      </div>
    </>
  );
};

export default AgentsPage;
