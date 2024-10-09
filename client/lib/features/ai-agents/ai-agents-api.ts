import { AgentType } from "@/types/AI-Agents";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const agentsApi = createApi({
  reducerPath: "agentsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.github.com/" }), // this is the base backend url
  endpoints: (builder) => ({
    getAgents: builder.query<AgentType[], void>({
      // query is a get request
      query: () => "/get-all-user-agents",
    }),
    getUsers: builder.query<UserType[], void>({
      // query is a get request
      query: () => "users",
    }),
    postAgents: builder.mutation({
      // mutation is one of post,put,del requests
      query: (data) => ({
        url: "/create-agent",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetAgentsQuery, useGetUsersQuery, usePostAgentsMutation } =
  agentsApi;
