import { FC } from "react"
import { Flex, Text } from "@chakra-ui/react"
import { useAppSelector } from "@/hooks/useAppSelector"
import { useAppDispatch } from "@/hooks/useAppDispatch"

import { SearchItem } from "./SearchItem"
import { chatActions } from '@/redux/slices/chat.slice'
import { IUser } from "@/types"

interface SearchResultsProps {
  results: {
    users: IUser[]
  }
}

export const SearchResults: FC<SearchResultsProps> = ({ results }) => {
  const dispatch = useAppDispatch()

  const onSearchItemClick = (user: IUser) => {
    dispatch(chatActions.setChat(user))
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
        <SearchItem 
          key={user.id}
          name={user.name}
          onClick={() => onSearchItemClick(user)}
        />
      )}
    </Flex>
  )
}