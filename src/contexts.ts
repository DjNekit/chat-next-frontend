import { createContext } from "react";
import { IChatApi } from "./lib/initialChatApi";

export const ChatsContext = createContext<null | IChatApi>(null)