import { Middleware } from "@reduxjs/toolkit";
import { chatActions } from "../slices/chat.slice";
import { Socket, io } from "socket.io-client";

export const wsMiddleware: Middleware = (store: any) => {
  let socket: Socket

  return (next: any) => (action: any) => {
    const isConnectionEstablished = socket && store.getState().chat.isConnected;

    if (chatActions.startConnection.match(action)) {
      socket = io(process.env.NEXT_PUBLIC_API!, {
        // withCredentials: true,
      });

      socket.on('connect', () => {
        store.dispatch(chatActions.connectionEstablished());
        // socket.emit('connect');
        console.log('connect')
      })

      socket.on('message', (message: any) => {
        // store.dispatch(chatActions.receiveMessage({ message }));
        console.log(message)
      })
    }

    if (chatActions.submitMessage.match(action) && isConnectionEstablished) {
      // socket.emit('send-message', action.payload);
      console.log(action.payload)
    }

    next(action);
  }
}
