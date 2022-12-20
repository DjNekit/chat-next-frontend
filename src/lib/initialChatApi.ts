import { Socket } from "socket.io-client";
import { IMessage } from "@/types";

export interface IChatApi {
  sendMessage: (message: IMessage) => void
}

export const initialChatApi = (socket: Socket | null): IChatApi | null => {
  if (!socket) return null

  return {
    sendMessage: (message: IMessage) => {
      socket.emit('message', message)
    }
  }
}