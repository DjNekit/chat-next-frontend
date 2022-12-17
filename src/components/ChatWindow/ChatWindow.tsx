import { Box, Grid } from "@chakra-ui/react"
import { FC } from "react"
import bg from '@/assets/images/chat-bg.png'

interface ChatProps {}

export const ChatWindow: FC<ChatProps> = () => {
  return (
    <Box 
      h='100%'
      bgGradient='linear(to-br, yellow.300, green.200, yellow.300)'
      _dark={{
        bgGradient: 'linear(to-br, black)'
      }}
    >
      <Grid
        templateRows='40px'
        h='inherit' 
        bgImg={`url(${bg.src})`}
      >
        <Box>Heh</Box>
      </Grid>
    </Box>
  )
}