import { Center, useColorMode } from "@chakra-ui/react"
import { FC, memo } from "react"
import { InfinitySpin } from "react-loader-spinner"

interface LoadingProps {
  color?: string
  overlay?: boolean
}

export const Loading: FC<LoadingProps> = memo(({ color, overlay = true }) => {
  const { colorMode } = useColorMode()

  const setColor = () => {
    if (color) return color
    return colorMode === 'light' ? 'black' : 'white'
  }

  return (
    <Center 
      h={overlay ? '100vh' : ''} 
      w={overlay ? '100vw' : ''}
      pos={overlay ? 'fixed' : 'static'}
      top={0}
      left={0}
      zIndex='overlay'
      layerStyle={overlay ? 'bg.main' : ''}
    >
      <InfinitySpin 
        width='200' 
        color={setColor()}
      />
    </Center>
  )
})