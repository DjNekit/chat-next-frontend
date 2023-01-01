import { IMessage } from '@/types'
import { useSize } from "@chakra-ui/react-use-size"
import { Box, Flex, Grid, useDimensions } from '@chakra-ui/react'
import { FC, ForwardedRef, forwardRef, memo, useEffect, useRef, useState } from 'react'
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
      p={4}
      height={height}
      overflow='auto'
    >
      <Flex 
        w={{
          lg: '80%',
        }} 
        m='0 auto'
        flexDirection='column'
        justifyContent='end'
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