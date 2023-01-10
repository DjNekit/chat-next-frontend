import { FC, memo } from "react"
import { Center, Flex, Spinner, Text } from "@chakra-ui/react"
import { useAppDispatch } from "@/hooks/useAppDispatch"

import { chatActions } from '@/redux/slices/chat.slice'
import { IUser } from "@/types"
import { ChatItem } from "../ChatItem/ChatItem"
import { useAppSelector } from "@/hooks/useAppSelector"
import { useChatByIdMutation } from "@/redux/api/chat"
import { Loading } from "../Loading/Loading"
// import { useUser } from "@/hooks/useUser"

interface SearchResultsProps {
  isLoading: boolean
  results: {
    users: IUser[]
  }
}

export const SearchResults: FC<SearchResultsProps> = memo(({ results, isLoading }) => {
  const [getChat] = useChatByIdMutation()
  const dispatch = useAppDispatch()
  
  const onSearchItemClick = (user: IUser) => {
    getChat(user.id)
  }

  if (isLoading) {
    return (
      <Center h='100%'>
        <Spinner />
      </Center>
    )
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
          email={user.email}
          onClick={() => onSearchItemClick(user)}
        />
      )}
    </Flex>
  )
})