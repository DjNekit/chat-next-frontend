import { ChatsContext } from "@/contexts"
import { useContext } from "react"

export const useChats = () => {
  const chatApi = useContext(ChatsContext)

  return chatApi
}