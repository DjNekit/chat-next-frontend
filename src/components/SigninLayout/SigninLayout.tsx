import { Box, Center, Flex, Grid, GridItem, SimpleGrid, position } from "@chakra-ui/react"
import Image from "next/image"
import { FC, ReactNode } from "react"
import { AnimatedLogo } from "./AnimatedLogo"

interface SigninLayoutProps {
  children: ReactNode
}

export const SigninLayout: FC<SigninLayoutProps> = ({ children }) => {
  return (
    <Flex 
      h='100vh' 
      flexDirection={{
        md: 'row',
        base: 'column'
      }} 
      justifyContent='space-around' 
    >
      <Image
        src='/planet.jpeg'
        alt="Background picture"
        fill
        style={{
          objectFit: 'cover',
        }}
      />
      <AnimatedLogo />
      <Center pos='relative'>
        {children}
      </Center>
    </Flex>
  )
}