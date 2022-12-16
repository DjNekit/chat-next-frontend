import { FC } from "react"
import { Avatar, Flex, Text } from "@chakra-ui/react"
import { IUser } from "@/types"

interface SearchItemProps {
  name: string
  onClick: () => void
}

export const SearchItem: FC<SearchItemProps> = ({ name, onClick }) => {
  return (
    <Flex
      gap={2}
      alignItems='center'
      p={3}
      borderRadius='lg'
      cursor='pointer'
      onClick={onClick}
      _hover={{
        bgColor: 'blackAlpha.100'
      }}
      _dark={{
        _hover: {
          bgColor: 'whiteAlpha.100'
        }
      }}
    >
      <Avatar name={name} />
      <Text fontWeight='bold'>{name}</Text>
    </Flex>
  )
}