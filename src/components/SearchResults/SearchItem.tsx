import { FC } from "react"
import { Avatar, Flex, Text } from "@chakra-ui/react"
import { IUser } from "@/types"

interface SearchItemProps {
  user: IUser
}

export const SearchItem: FC<SearchItemProps> = ({ user }) => {
  return (
    <Flex
      key={user.id}
      gap={2}
      alignItems='center'
      p={3}
      borderRadius='lg'
      cursor='pointer'
      _hover={{
        bgColor: 'blackAlpha.100'
      }}
      _dark={{
        _hover: {
          bgColor: 'whiteAlpha.100'
        }
      }}
    >
      <Avatar name={user.name} />
      <Text fontWeight='bold'>{user.name}</Text>
    </Flex>
  )
}