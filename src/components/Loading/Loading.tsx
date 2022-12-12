import { Center, useColorMode } from "@chakra-ui/react"
import { InfinitySpin } from "react-loader-spinner"

export const Loading = () => {
  const { colorMode } = useColorMode()
  return (
    <Center 
      h='100vh' 
      w='100vw' 
      pos='fixed'
      top={0}
      left={0}
      bg='blackAlpha.50'
    >
      <InfinitySpin 
        width='200' 
        color={colorMode === 'light' ? 'black' : 'white'}
      />
    </Center>
  )
}