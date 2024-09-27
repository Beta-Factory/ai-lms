import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

export interface ExampleState {
  value: number;
  status: "idle" | "loading" | "failed";
}

const initialState: ExampleState = {
  value: 0,
  status: "idle",
};

export const exampleSlice = createSlice({
  name: "example",
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

export const selectExample = (state: RootState) => state.example.value;
export default exampleSlice.reducer;
