import { configureStore } from "@reduxjs/toolkit";
import exampleSlice from "../features/example/exampleSlice";
import { apiExample } from "../features/example/apiExample";

export const createStore = () => {
  // store variable is a global variable
  return configureStore({
    reducer: {
      [apiExample.reducerPath]: apiExample.reducer,
      example: exampleSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([apiExample.middleware]),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof createStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
