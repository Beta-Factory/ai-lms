import { configureStore } from "@reduxjs/toolkit";

import { agentReducer } from "../features/ai-agents/ai-agents-Slice";
import { agentsApi } from "../features/ai-agents/ai-agents-api";

export const makeStore = () => {
  // store variable is a global variable
  return configureStore({
    reducer: {
      [agentsApi.reducerPath]: agentsApi.reducer,
      agent: agentReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([agentsApi.middleware]),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
