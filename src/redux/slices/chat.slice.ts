import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "@/types";

interface IChatState {
  activeChat: IUser | null
}

const initialState: IChatState = {
  activeChat: null
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChat: (state, action: PayloadAction<IUser>) => {
      state.activeChat = action.payload
    }
  }
})

export const chatReducer = chatSlice.reducer
export const chatActions = chatSlice.actions