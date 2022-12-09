import { Center } from "@chakra-ui/react"
import { InfinitySpin } from "react-loader-spinner"

export const Loading = () => {
  return (
    <Center 
      h='100vh' 
      w='100vw' 
      pos='fixed'
      top={0}
      left={0}
      bg='blackAlpha.50'
    >
      <InfinitySpin width='200' color='black'/>
    </Center>
  )
}