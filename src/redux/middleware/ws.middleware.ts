import { Middleware } from "@reduxjs/toolkit";
import { chatActions } from "../slices/chat.slice";
import { Socket, io } from "socket.io-client";
import { RootState } from "../store";
import { authActions } from "../slices/auth.slice";
import { authApi } from "../api/auth";
import { Mutex } from "async-mutex";
import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

const mutex = new Mutex()

let counter = 0

export const wsMiddleware: Middleware = ({ getState, dispatch }) => {
  let socket: Socket

  return (next: any) => (action: any) => {
    const isConnect = socket && (getState() as RootState).chat.isConnect;

    if (chatActions.startConnection.match(action)) {
      const accessToken = getState().auth.accessToken
      socket = io(process.env.NEXT_PUBLIC_API!, {
        auth: {
          token: accessToken
        },
      });

      socket.on('connect', () => {
        dispatch(chatActions.connectionEstablished());
        console.log('connect')
      })

      socket.on('connect_error', (error) => {
        dispatch(chatActions.setError(error))
      });

      socket.on('error', async (error) => {
        await mutex.waitForUnlock()
        const isAuthError = error.statusCode === 401

        if (isAuthError) {
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
              .disconnect()
              .connect()
              .emit(type, body)
          }
        }
      });

      socket.on('message', (message) => {
        console.log(message)
      })
    }


    if (chatActions.submitMessage.match(action) && isConnect) {
      const accessToken = (getState() as RootState).auth.accessToken
      // socket.auth = { token: accessToken }

      socket.emit('events', {
        message: 'hi from client'
      })
    }

    next(action);
  }
}
