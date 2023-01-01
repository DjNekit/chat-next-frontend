import { IMessage, IUser } from '@/types'
import { Avatar, Box, Flex, Grid, GridItem } from '@chakra-ui/react'
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
    <Grid
      gap={2}
      gridTemplateColumns='48px auto 48px'
      alignItems='end'
    >
      <GridItem>
        {!fromMe &&
          <Avatar size='md' name={author?.name} />
        }
      </GridItem>
      <GridItem 
        justifySelf={fromMe ? 'end' : 'start'}
        pos='relative'

      >
        <Box
          layerStyle='bg.main'
          borderRadius='2xl'
          borderBottomRightRadius={fromMe ? 0 : ''}
          borderBottomLeftRadius={!fromMe ? 0 : ''}
          px={4}
          py={2}
          wordBreak='break-all'
        >
          {message.content}
        </Box>
        <Box
          position='absolute'
          left={fromMe ? '100%' : ''}
          right={fromMe ? '' : '100%'}
          transform={!fromMe ? 'scale(-1, 1)' : ''}
          bottom='-32px'
        >
          <MessageTaleIcon />
        </Box>
      </GridItem>
      <GridItem>
        {fromMe &&
          <Avatar size='md' name={author?.name} />
        }
      </GridItem>
    </Grid>
  )
})