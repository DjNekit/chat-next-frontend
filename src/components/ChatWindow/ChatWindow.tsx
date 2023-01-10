import { FC, useCallback, useEffect, useRef, useState } from "react"
import { Box, Fade, Grid, GridItem, Slide, useColorMode } from "@chakra-ui/react"
import { useAppSelector } from "@/hooks/useAppSelector"
import { ChatHeader, MessageInput, Messages } from "@/components"
import bg from '@/assets/images/chat-bg.png'
import bgDark from '@/assets/images/chat-bg-dark.png'
import { useAppDispatch } from "@/hooks/useAppDispatch"
import { chatActions } from "@/redux/slices/chat.slice"
import { nanoid } from "nanoid"

interface ChatProps { }

export const ChatWindow: FC<ChatProps> = () => {
  const dispatch = useAppDispatch()
  const { activeChat } = useAppSelector(state => state.chat)
  const userId = useAppSelector(state => state.auth.user?.id)
  const { colorMode } = useColorMode()
  const [height, setHeight] = useState<any>('auto')
  const ref = useRef<HTMLDivElement>(null)
  const messagesAreaRef = useRef<HTMLDivElement>(null)
  
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

  useEffect(() => {
    if (messagesAreaRef.current && activeChat?.id) {
      messagesAreaRef.current.scrollTop = messagesAreaRef.current.scrollHeight
    }
  }, [activeChat?.id])

  useEffect(() => {
    if (messagesAreaRef.current) {
      scrollToBottom()
    }
  }, [activeChat?.messages])

  const scrollToBottom = () => {
    messagesAreaRef.current?.scrollBy({
      behavior: 'smooth',
      top: messagesAreaRef.current?.scrollHeight
    })
  }

  const onSubmit = useCallback(async (newMessage: string) => {
    const message = {
      id: nanoid(),
      content: newMessage,
      chatId: activeChat?.id,
      status: 'unread',
      author_id: userId,
      created_date: Date.now()
    }
    await dispatch(chatActions.submitMessage(message))
   
  }, [userId, activeChat?.id])

  return (
    <Box
      bgGradient='linear(to-br, yellow.300, green.200, yellow.300)'
      overflow='hidden'
      _dark={{
        bgGradient: 'none',
        bg: 'gray.900'
      }}
    >
      <Box
        bgImg={`url(${colorMode === 'light' ? bg.src : bgDark.src})`}
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
                ref={messagesAreaRef}
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
              <MessageInput 
                onSubmit={onSubmit}
              />
            </Slide>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  )
}