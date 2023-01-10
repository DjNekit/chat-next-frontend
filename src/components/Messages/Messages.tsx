import { Box, Flex } from '@chakra-ui/react'
import { forwardRef } from 'react'
import { MessageItem } from './MessageItem'
import { useAppSelector } from '@/hooks/useAppSelector'

interface MessagesProps {
  height?: number
}

type Ref = HTMLDivElement

export const Messages = forwardRef<Ref, MessagesProps>((
  { height },
  ref
) => {
  const { user } = useAppSelector(state => state.auth)
  const messages = useAppSelector(state => state.chat.activeChat?.messages)


  return (
    <Box
      ref={ref}
      py={4}
      px={5}
      pb={0}
      height={height}
      overflowY='auto'
      overflowX='hidden'
    >
      <Flex 
        maxW='685px'
        h='100%'
        justifyContent='flex-end'
        m='0 auto'
        px={5}
        flexDirection='column'
        gap={2}
      >
        {messages?.map(message => {
          const fromMe = message.author_id === user?.id
          const author = fromMe ? user : user 

          return (
            <MessageItem
              key={message.id}
              fromMe={fromMe}
              author={author}
              message={message}
            />
            )
        })}
      </Flex>
    </Box>
  )
})