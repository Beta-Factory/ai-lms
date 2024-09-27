import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiExample = createApi({
  reducerPath: "apiExample",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }), // this is the base backend url
  endpoints: (builder) => ({
    getExample: builder.query({
      // query is a get request
      query: () => "example",
    }),
    postExample: builder.mutation({
      // mutation is one of post,put,del requests
      query: (data) => ({
        url: "example",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetExampleQuery, usePostExampleMutation } = apiExample;
