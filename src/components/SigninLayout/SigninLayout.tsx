import { Box, Center, Flex, Grid, GridItem, SimpleGrid } from "@chakra-ui/react"
import Image from "next/image"
import { FC, ReactNode } from "react"
import { AnimatedLogo } from "./AnimatedLogo"

interface SigninLayoutProps {
  children: ReactNode
}

export const SigninLayout: FC<SigninLayoutProps> = ({ children }) => {
  return (
    <SimpleGrid 
      columns={{
        sm: 1,
        md: 2
      }} 
      h='100vh' 
      bg='black'
    >
      <Box pos='relative'>
        <Image 
          src='/planet.jpeg' 
          alt="Background picture"
          fill
          style={{ objectFit: 'cover' }}
        />
        <AnimatedLogo />
      </Box>
      <Center 
        borderTopRightRadius='5%' 
        borderTopLeftRadius={{
          base: '5%',
          md: '0%',
        }}
        bg='white'
      >
        {children}
      </Center>
    </SimpleGrid>
  )
}