import { Button, Center, Flex, Spinner, Text } from "@chakra-ui/react"
import { useAppSelector } from "@/hooks/useAppSelector"
import { useAppDispatch } from "@/hooks/useAppDispatch"

import { ChatItem } from "../ChatItem/ChatItem"
import { chatActions } from "@/redux/slices/chat.slice"
import { IChat, IUser } from "@/types"
import { memo } from "react"
import { useChatsQuery } from "@/redux/api/chat"


export const Chats = memo(() => {
  const { data, isLoading } = useChatsQuery({})

  const activeChat = useAppSelector(state => state.chat.activeChat)
  const dispatch = useAppDispatch()

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

  // if (!chats && !isLoading) {
    return (
      <Center h='100%'>
        <Text>You don't have any active chats yet</Text>
        <Button onClick={onClick}>Emit</Button>
      </Center>
    )
  // }

  // return (
  //   <Flex
  //     pt={5}
  //     flexDirection='column' 
  //   >
  //     {chats.map((chat: IChat) => {
  //       const adressee = chat.members
  //         .find((member: IUser) => member.id !== chat.creatorId)!

  //       return (
  //         <ChatItem
  //           key={chat.id}
  //           name={adressee.name}
  //           isActive={activeChat?.id === chat.id}
  //           onClick={() => dispatch(chatActions.setChat(chat))}
  //         />
  //       )
  //     })}
  //   </Flex>
  // )
})