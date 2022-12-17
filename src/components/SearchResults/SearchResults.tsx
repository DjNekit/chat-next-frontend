import { FC } from "react"
import { Flex, Text } from "@chakra-ui/react"
import { useAppDispatch } from "@/hooks/useAppDispatch"

import { chatActions } from '@/redux/slices/chat.slice'
import { IUser } from "@/types"
import { ChatItem } from "../ChatItem/ChatItem"
import { useUser } from "@/hooks/useUser"

interface SearchResultsProps {
  results: {
    users: IUser[]
  }
}

export const SearchResults: FC<SearchResultsProps> = ({ results }) => {
  const { user: currentUser } = useUser()
  const dispatch = useAppDispatch()

  const onSearchItemClick = (user: IUser) => {
    dispatch(chatActions.setChat({
      isGroup: false,
      members: [currentUser, user],
      messages: []
    }))
  }

  return (
    <Flex 
      p={3} 
      flexDirection='column' 
    >
      {results?.users.length > 0 &&
        <Text color='gray.500' fontWeight='semibold'>
          Global search:
        </Text>
      }
      {results?.users.map((user: IUser) =>
        <ChatItem 
          key={user.id}
          name={user.name}
          onClick={() => onSearchItemClick(user)}
        />
      )}
    </Flex>
  )
}