import { AnyAction, Middleware, PayloadAction } from "@reduxjs/toolkit";
import { chatActions } from "../slices/chat.slice";
import { Socket, io } from "socket.io-client";
import { RootState } from "../store";
import { authActions } from "../slices/auth.slice";

export const wsMiddleware: Middleware = ({ getState, dispatch }) => {
  let socket: Socket

  return next => (action: PayloadAction<AnyAction>) => {
    const isConnect = socket && (getState() as RootState).chat.isConnect;

    if (chatActions.startConnection.match(action)) {
      const accessToken = (getState() as RootState).auth.accessToken
      socket = io(process.env.NEXT_PUBLIC_API!, {
        auth: {
          token: accessToken
        },
      });

      socket.on('connect', () => {
        dispatch(chatActions.connectionEstablished());
      })

      socket.on('connect_error', (error) => {
        dispatch(chatActions.setError(error))
      });

      socket.on('error', async (error) => {
        const isAuthError = error.statusCode === 401

        if (isAuthError) {
          socket.disconnect()
          const { failedMessage: { type, body } } = error
          const result = await fetch('/api/auth/refresh', {
            method: 'POST',
          })
          const data = await result.json()
          const accessToken = data.accessToken

          if (accessToken) {
            dispatch(authActions.setToken(accessToken))
            
            socket.auth = {
              token: accessToken
            }

            socket
              .connect()
              .emit(type, body)
          }
        }
      });

      socket.on('message', (message) => {
        dispatch(chatActions.newMessage(message))
      })
    }

    if (chatActions.submitMessage.match(action) && isConnect) {
      socket.emit('newMessage', action.payload)
    }
    if (chatActions.getChat.match(action) && isConnect) {
      socket.emit('createChat', action.payload)
    }

    next(action);
  }
}
