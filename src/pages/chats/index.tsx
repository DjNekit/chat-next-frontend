import { ReactNode } from "react";
import { ChatLayout } from "@/components";

export default function ChatsPage() {
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
