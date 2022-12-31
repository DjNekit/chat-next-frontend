import { memo } from "react"
import { Button, Center, Flex, Spinner, Text } from "@chakra-ui/react"
import { useAppSelector } from "@/hooks/useAppSelector"
import { useAppDispatch } from "@/hooks/useAppDispatch"

import { ChatItem } from "../ChatItem/ChatItem"
import { chatActions } from "@/redux/slices/chat.slice"
import { useChatsQuery } from "@/redux/api/chat"
import { IChat, IUser } from "@/types"


export const Chats = memo(() => {
  const dispatch = useAppDispatch()
  const { isLoading } = useChatsQuery('')
  const { activeChat, chats } = useAppSelector(state => state.chat)

  const onClick = () => {
    dispatch(chatActions.submitMessage({}))
  }

  if (isLoading) {
    return (
      <Center h='100%'>
        <Spinner />
      </Center>
    )
  }

  if (!chats.length && !isLoading) {
    return (
      <Center h='100%'>
        <Text>You don't have any active chats yet</Text>
        <Button onClick={onClick}>Emit</Button>
      </Center>
    )
  }

  return (
    <Flex
      pt={5}
      flexDirection='column' 
    >
      {chats.map((chat: IChat) => {
        const adressee = chat.members
          .find((member: IUser) => member.id !== chat.author_id)!

        return (
          <ChatItem
            key={chat.id}
            name={adressee.name}
            email={adressee.email}
            isActive={activeChat?.id === chat.id}
            onClick={() => dispatch(chatActions.setChat(chat))}
          />
        )
      })}
    </Flex>
  )
})