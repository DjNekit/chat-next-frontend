import { useChats } from "@/hooks/useChats"
import { Center, Text } from "@chakra-ui/react"

export const Chats = () => {
  const { chats, isLoading, isError } = useChats()
  console.log(chats)

  return (
    <Center h='100%'>
      <Text>You don't have any active chats yet</Text>
    </Center>
  )
}