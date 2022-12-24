import { configureStore } from "@reduxjs/toolkit";
import { chatReducer } from "./slices/chat.slice";
import { authReducer } from "./slices/auth.slice";
import { api } from "@/lib/api";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    chat: chatReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch