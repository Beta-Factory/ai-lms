// ? ============ component ============
import React from "react";
import { useGetAgentsQuery } from "./ai-agents-api";
import { AgentType } from "@/types/AI-Agents";

const AgentsList = () => {
  const { data: agents, isError, isLoading } = useGetAgentsQuery({});

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error !! </div>;

  return (
    <div>
      <h1>Agents</h1>
      <ul>
        {agents?.map((agent: AgentType) => (
          <li key={agent.id}>
            <h2>{agent.agentName}</h2>
            <p>{agent.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AgentsList;
