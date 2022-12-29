import { FC } from "react"
import { Avatar, Flex, Text } from "@chakra-ui/react"

interface ChatItemProps {
  name: string
  email: string
  isActive?: boolean
  onClick: () => void
}

export const ChatItem: FC<ChatItemProps> = ({ name, email, isActive, onClick }) => {
  return (
    <Flex
      gap={2}
      alignItems='center'
      p={3}
      borderRadius='lg'
      cursor='pointer'
      bgColor={isActive ? 'telegram.400' : undefined}

      onClick={onClick}
      _hover={{
        bgColor: !isActive && 'blackAlpha.100'
      }}
      _dark={{
        bgColor: isActive ? 'telegram.800' : undefined,
        _hover: {
          bgColor: !isActive && 'whiteAlpha.100'
        }
      }}
    >
      <Avatar name={name} />
      <Text fontWeight='bold'>{name} / {email}</Text>
    </Flex>
  )
}