import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IChat, IUser } from "@/types";

interface IChatState {
  activeChat: any
  isEstablishingConnection: boolean
  isConnect: boolean
}

const initialState: IChatState = {
  activeChat: null,
  isEstablishingConnection: false,
  isConnect: false
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    startConnection: (state) => {
      state.isEstablishingConnection = true
    },
    connectionEstablished: (state) => {
      state.isConnect = true
      state.isEstablishingConnection = true
    },
    receiveMessage: ((state, action) => {
      console.log(action.payload)
    }),
    submitMessage: ((state, action) => {
      return;
    }),
    setChat: (state, action: PayloadAction<IChat>) => {
      state.activeChat = action.payload
    },
  }
})

export const chatReducer = chatSlice.reducer
export const chatActions = chatSlice.actions