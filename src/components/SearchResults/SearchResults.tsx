import { IUser } from "@/types"
import { Flex, Text, Avatar } from "@chakra-ui/react"
import { FC } from "react"

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
      gap={3}
    >
      <Text color='gray.500' fontWeight='semibold'>
        Global search:
      </Text>
      {results?.users.map((user: IUser) =>
        <Flex key={user.id} gap={2} alignItems='center'>
          <Avatar name={user.name} />
          <Text fontWeight='bold'>{user.name}</Text>
        </Flex>
      )}
    </Flex>
  )
}