import { IMessage, IUser } from '@/types'
import { Box } from '@chakra-ui/react'
import React, { FC, memo } from 'react'
import { MessageTaleIcon } from '../Icons/MessageTaleIcon'

interface MessageItemProps {
  fromMe: boolean
  message: IMessage
  author: IUser | null
}

export const MessageItem: FC<MessageItemProps> = memo(({
  fromMe,
  message,
  author
}) => {
  return (
    <Box
      layerStyle='bg.main'
      borderRadius='2xl'
      borderBottomRightRadius={fromMe ? 0 : ''}
      borderBottomLeftRadius={!fromMe ? 0 : ''}
      px={4}
      py={2}
      alignSelf={fromMe ? 'flex-end' : 'flex-start'}
      maxW='75%'
      wordBreak='break-all'
      position='relative'
    >
      {message.content}
      <Box
        position='absolute'
        left={fromMe ? '100%' : ''}
        right={fromMe ? '' : '100%'}
        transform={!fromMe ? 'scale(-1, 1)' : ''}
        bottom='-32px'
      >
        <MessageTaleIcon />
      </Box>
    </Box>
  )
})