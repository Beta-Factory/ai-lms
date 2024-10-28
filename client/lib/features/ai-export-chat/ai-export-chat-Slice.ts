import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { SelectedMessage } from "@/components/chatScreen/ChatUI";

export interface ExChatState {
  EXmessages: SelectedMessage;
}

const initialState: ExChatState = {
  EXmessages: {
    index: 0,
    message: { message: "", role: "ai", isLoading: false },
  },
};

export const exChatSlice = createSlice({
  name: "exportChat",
  initialState,

  reducers: {
    EditMessage: (
      state,
      action: PayloadAction<{ index: number; message: Message }>
    ) => {
      const { index, message } = action.payload;
      console.log("EditMessage from state reducer", index, message); // ! Debugging

      if (index >= 0) {
        state.EXmessages.index = index;
        state.EXmessages.message = message;
        console.log(
          "EditMessage from state reducer inside the if block",
          state.EXmessages.message
        ); // ! Debugging
      }
    },
  },
});

export const selectAiEXChatMessages = (state: RootState) => state.exportChat;
export const exChatReducer = exChatSlice.reducer;
export const { EditMessage } = exChatSlice.actions;
