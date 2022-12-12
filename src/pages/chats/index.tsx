import { ReactNode, useCallback } from "react";
import { ChatLayout, Loading } from "@/components";
import { useUser } from "@/hooks/useUser";
import { api } from "@/api";

export default function ChatsPage() {
  const { user, isLogout, isLoading, mutate } = useUser()


  

  return (
    <></>
  )
}

ChatsPage.getLayout = function getLayout(page: ReactNode) {
  return (
    <ChatLayout title='Chats'>
      {page}
    </ChatLayout>
  )
}
