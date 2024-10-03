import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface AgentsState {
  value: number;
  status: "idle" | "loading" | "failed";
}

const initialState: AgentsState = {
  value: 0,
  status: "idle",
};

export const agentsSlice = createSlice({
  name: "agents",
  initialState,

  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const selectAgents = (state: RootState) => state;
export const agentReducer = agentsSlice.reducer;
