import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface ChatState {
  files: File[];
  messages: Message[];
}

const initialState: ChatState = {
  files: [],
  messages: [
    {
      role: "ai",
      message: "Hello! How can I help you today?",
      isLoading: false,
    },
    {
      role: "user",
      message: "Can you explain how AI works?",
      isLoading: false,
    },
  ],
};

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
      state.messages = [];
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    replaceMessage: (
      state,
      action: PayloadAction<{ index: number; message: Message }>
    ) => {
      const { index, message } = action.payload;
      if (index >= 0 && index < state.messages.length) {
        state.messages[index] = message;
      }
    },
  },
});

export const selectAiChatFiles = (state: RootState) => state.chat.files;
export const selectAiChatMessages = (state: RootState) => state.chat.messages;
export const chatReducer = chatSlice.reducer;
export const { handleUpload, clearFiles, addMessage, replaceMessage } =
  chatSlice.actions;
