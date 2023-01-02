import { IMessage } from '@/types'
import { Box, Flex } from '@chakra-ui/react'
import { FC, useEffect, useRef } from 'react'
import { MessageItem } from './MessageItem'
import { useAppSelector } from '@/hooks/useAppSelector'

interface MessagesProps {
  chatId?: number
  height?: number
  data?: IMessage[]
}

export const Messages: FC<MessagesProps> = ({ data = [], height, chatId }) => {
  const ref = useRef<HTMLDivElement>(null)
  const { user } = useAppSelector(state => state.auth)

  useEffect(() => {
    if (ref.current && chatId) {
      ref.current.scrollTop = ref.current.scrollHeight
    }
  }, [chatId])

  return (
    <Box
      ref={ref}
      py={4}
      px={5}
      height={height}
      overflowY='auto'
      overflowX='hidden'
    >
      <Flex 
        maxW='685px' 
        m='0 auto'
        flexDirection='column'
        gap={2}
      >
        {data.map(message => {
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
}