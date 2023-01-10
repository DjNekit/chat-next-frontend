import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IChat } from "@/types";
import { chatApi } from "../api/chat";

interface IChatState {
  activeChat: IChat | null
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
    submitMessage: (state, action) => {
      state.activeChat?.messages.push(action.payload)
    },
    newMessage: (state, action) => {
      const { chatId, ...message } = action.payload
      const chatIndex = state.chats.findIndex(chat => chat.id === chatId)
      state.chats[chatIndex].messages.push(message)
      state.activeChat?.messages.push(message)
    },
    setChat: (state, action: PayloadAction<IChat | null>) => {
      state.activeChat = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(chatApi.endpoints.chats.matchFulfilled, (state, action) => {
        state.chats = action.payload
      })

    builder
      .addMatcher(chatApi.endpoints.chatById.matchFulfilled, (state, action) => {
        state.activeChat = action.payload
      })
  }
})

export const chatReducer = chatSlice.reducer
export const chatActions = chatSlice.actions