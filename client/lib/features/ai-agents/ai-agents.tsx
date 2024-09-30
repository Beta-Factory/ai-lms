// ? ============ component ============
import React from "react";
import { useGetAgentsQuery } from "./ai-agents-api";

const AgentsList = () => {
  const { data: agents, isError, isLoading } = useGetAgentsQuery({});

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error !! </div>;

  return (
    <div>
      <h1>Agents</h1>
      <ul>
        {agents?.map((agent: any) => (
          <li key={agent.id}>
            <h2>{agent.name}</h2>
            <p>{agent.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AgentsList;
