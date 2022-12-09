import { Center } from "@chakra-ui/react"
import { InfinitySpin } from "react-loader-spinner"

export const Loading = () => {
  return (
    <Center h='100%'>
      <InfinitySpin width='200' color='black'/>
    </Center>
  )
}