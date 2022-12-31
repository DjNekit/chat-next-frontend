import { FC, useEffect, useRef, useState } from "react"
import { Box, Center, Fade, Grid, GridItem, Slide } from "@chakra-ui/react"
import { useAppSelector } from "@/hooks/useAppSelector"
import { ChatHeader, Messages } from "@/components"
import bg from '@/assets/images/chat-bg.png'

interface ChatProps { }

export const ChatWindow: FC<ChatProps> = () => {
  const { activeChat } = useAppSelector(state => state.chat)
  const ref = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<any>('auto')

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (ref.current) {
        setHeight(ref.current?.clientHeight)
      }
    })

    if (ref.current) {
      setHeight(ref.current.scrollHeight)
    }
  }, [])

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
          h='100vh'
        >
          <GridItem>
            <Slide
              in={!!activeChat}
              direction='top'
              style={{ position: 'relative' }}
            >
              <ChatHeader name={activeChat?.members[0].name} />
            </Slide>
          </GridItem>
          <GridItem ref={ref} overflow='hidden'>
            <Fade in={!!activeChat}>
              <Messages
                chatId={activeChat?.id}
                data={activeChat?.messages}
                height={height}
              />
            </Fade>
          </GridItem>
          <GridItem>
            <Slide
              in={!!activeChat}
              direction='bottom'
              style={{ position: 'relative' }}
            >
              <Center>
                Send
              </Center>
            </Slide>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  )
}