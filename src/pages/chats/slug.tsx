import { ChatLayout } from "@/components"
import { ReactNode } from "react"

export default function ChatSlug() {
  return (
    <div>Slug</div>
  )
}

ChatSlug.getLayout = (page: ReactNode) => {
  return (
    <ChatLayout title="Chats">
      {page}
    </ChatLayout>
  )
}