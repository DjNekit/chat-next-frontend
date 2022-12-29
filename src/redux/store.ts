import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { chatReducer } from "./slices/chat.slice";
import { authReducer } from "./slices/auth.slice";
import { api } from "@/lib/api";
import { wsMiddleware } from "./middleware/ws.middleware";
import { HYDRATE, createWrapper } from "next-redux-wrapper";

const combinedReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authReducer,
  chat: chatReducer
})

const rootReducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload
    };
    if (state.count) nextState.count = state.count; 
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, wsMiddleware),
})

const makeStore = () => store

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const wrapper = createWrapper<AppStore>(makeStore)
