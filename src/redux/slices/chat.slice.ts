import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IChat, IUser } from "@/types";
import { chatApi } from "../api/chat";

interface IChatState {
  activeChat: any
  isEstablishingConnection: boolean
  isConnect: boolean,
  error: ''

  chats: any[]
}

const initialState: IChatState = {
  activeChat: null,
  isEstablishingConnection: false,
  isConnect: false,
  error: '',
  chats: []
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
    setError: (state, action) => {
      state.error = action.payload.message
      state.isEstablishingConnection = false
    },
    receiveMessage: (state, action) => {
      console.log(action.payload)
    },
    submitMessage: (state, action) => {
      return;
    },
    setChat: (state, action: PayloadAction<IChat>) => {
      state.activeChat = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(chatApi.endpoints.chats.matchFulfilled, (state, action) => {
        state.chats = action.payload.chats
      })
  }
})

export const chatReducer = chatSlice.reducer
export const chatActions = chatSlice.actions