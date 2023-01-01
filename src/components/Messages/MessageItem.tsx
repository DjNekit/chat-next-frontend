import { IMessage, IUser } from '@/types'
import { Avatar, Box, Flex, Grid, GridItem } from '@chakra-ui/react'
import React, { FC, memo } from 'react'

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
    // alignItems='center'
    // alignSelf={fromMe ? 'flex-end' : 'flex-start'}
    // flexDirection={fromMe ? 'row-reverse' : 'row'}
    >
      <GridItem>
        {!fromMe &&
          <Avatar size='md' name={author?.name} />
        }
      </GridItem>
      <GridItem justifySelf={fromMe ? 'end' : 'start'}>
        <Box
          layerStyle='bg.main'
          borderRadius='3xl'
          px={4}
          py={2}
          wordBreak='break-all'
        >
          {message.content}
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