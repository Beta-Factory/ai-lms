import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface ChatState {
  files: File[] ;
}

const initialState: ChatState = {
    files: [],
}

export const chatSlice = createSlice({
  name: "chat",
  initialState,

  reducers: {
    handleUpload: (state, action: PayloadAction<File[]>) => {
        // Store the uploaded files globally
        state.files = action.payload;
      },
      clearFiles: (state) => {
        // Clear the files
        state.files = [];
      },
  },
});

export const selectAiChat = (state: RootState) => state;
export const chatReducer = chatSlice.reducer;
export const { handleUpload } = chatSlice.actions;


