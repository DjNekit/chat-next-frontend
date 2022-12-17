import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IChat, IUser } from "@/types";

interface IChatState {
  activeChat: any
}

const initialState: IChatState = {
  activeChat: null
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChat: (state, action: PayloadAction<IChat>) => {
      state.activeChat = action.payload
    }
  }
})

export const chatReducer = chatSlice.reducer
export const chatActions = chatSlice.actions