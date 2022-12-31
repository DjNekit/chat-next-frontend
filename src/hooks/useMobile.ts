import { useMediaQuery } from "@chakra-ui/react"

export const useIsMobile = () => {
  const [isSmallerThan480] = useMediaQuery('(max-width: 480px)')

  return Boolean(isSmallerThan480)
}