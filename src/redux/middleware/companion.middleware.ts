import { AnyAction, Middleware, PayloadAction } from "@reduxjs/toolkit";
import { chatActions } from "../slices/chat.slice";
import { Socket, io } from "socket.io-client";
import { RootState } from "../store";
import { authActions } from "../slices/auth.slice";

export const companionMiddleware: Middleware = ({ getState, dispatch }) => {
  return next => (action: PayloadAction<AnyAction>) => {
    if (chatActions.setChat.match(action)) {
      const isPrivate = action.payload.isPrivate

      if (isPrivate) {
        // const userId = (getState() as RootState).auth.
        // action.payload.companion = 
        return next(action)
      }
    }

    next(action);
  }
}
