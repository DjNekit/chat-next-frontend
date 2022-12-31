import { Box, Center, Fade, Grid, Slide } from "@chakra-ui/react"
import { FC } from "react"
import bg from '@/assets/images/chat-bg.png'
import { useAppSelector } from "@/hooks/useAppSelector"
import { ChatHeader } from "../ChatHeader/ChatHeader"

interface ChatProps { }

export const ChatWindow: FC<ChatProps> = () => {
  const { activeChat } = useAppSelector(state => state.chat)

  return (
    <Box
      bgGradient='linear(to-br, yellow.300, green.200, yellow.300)'
      overflow='hidden'
      _dark={{
        bgGradient: 'linear(to-br, black)'
      }}
    >
      <Box
        bgImg={`url(${bg.src})`}
        h='100vh'
      >
        <Grid
          templateRows='auto 1fr auto'
          h='100%'
        >
          <Slide
            in={!!activeChat}
            direction='top'
            style={{ position: 'relative' }}
          >
            <ChatHeader />
          </Slide>
          <Center
            as={Fade}
            in={!!activeChat}
          >
            Message
          </Center>
          <Center
            as={Slide}
            in={!!activeChat}
            direction='bottom'
            style={{ position: 'relative' }}
          >
            Send
          </Center>
        </Grid>
      </Box>
    </Box>
  )
}