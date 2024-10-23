import { AgentType } from "@/types/AI-Agents";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import dotenv from "dotenv";

dotenv.config();

export const agentsApi = createApi({
  reducerPath: "agentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
  }), // this is the base backend url
  endpoints: (builder) => ({
    getAgents: builder.query<AgentType[], void>({
      // query is a get request
      query: () => ({
        url: `/ai/get-all-user-agents`,

        // responseHandler: (response) => response.json(),
      }),
    }),
    getGoogleAuth: builder.query({
      query: () => ({
        url: `/auth/google`,
      }),
    }),
    getChats: builder.query({
      // query is a get request
      query: () => ({
        url: `/ai/get-all-chats`,
        responseHandler: (response) => response.text(),
      }),
    }),
    postAgents: builder.mutation({
      // mutation is one of post,put,del requests
      query: (data) => ({
        url: "/ai/create-agent",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetGoogleAuthQuery,
  useGetAgentsQuery,
  usePostAgentsMutation,
} = agentsApi;
