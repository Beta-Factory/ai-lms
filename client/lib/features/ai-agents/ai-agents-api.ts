import { AgentType } from "@/types/AI-Agents";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const agentsApi = createApi({
  reducerPath: "agentsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }), // this is the base backend url
  endpoints: (builder) => ({
    getAgents: builder.query({
      // query is a get request
      query: () => "agents",
    }),
    postAgents: builder.mutation({
      // mutation is one of post,put,del requests
      query: (data) => ({
        url: "agents",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetAgentsQuery, usePostAgentsMutation } = agentsApi;
