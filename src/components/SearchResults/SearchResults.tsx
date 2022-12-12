import { IUser } from "@/types"
import { Flex, Text } from "@chakra-ui/react"
import { FC } from "react"
import { SearchItem } from "./SearchItem"

interface SearchResultsProps {
  results: {
    users: IUser[]
  }
}

export const SearchResults: FC<SearchResultsProps> = ({ results }) => {
  return (
    <Flex 
      p={3} 
      flexDirection='column' 
    >
      <Text color='gray.500' fontWeight='semibold'>
        Global search:
      </Text>
      {results?.users.map((user: IUser) =>
        <SearchItem key={user.id} user={user}/>
      )}
    </Flex>
  )
}