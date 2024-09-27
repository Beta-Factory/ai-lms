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

  reducers: {},

  extraReducers: (builder) => {
    // builder.addCase(exampleThunk.pending, (state) => {
    //     state.status = 'loading';
    //     state.value = 1;
    // })
    // builder.addCase(exampleThunk.fullfilled, (state) => {
    //     state.status = 'idle';
    //     state.value = 0;
    // })
    // builder.addCase(exampleThunk.rejected, (state) => {
    //     state.status = 'failed';
    //     state.value = 0;
  },

  // }
});

export const selectExample = (state: RootState) => state.example.value;
export default exampleSlice.reducer;
