import { Link as ChakraLink, LinkProps as ChakraLinkProps } from '@chakra-ui/react';
import NextLink from 'next/link';
import { FC, ReactNode } from 'react';

interface LinkProps extends Omit<ChakraLinkProps, 'as'> {
  lighter?: boolean
  children: ReactNode
}

export const Link: FC<LinkProps> = ({ lighter, children, ...restProps }) => {

  return (
    <ChakraLink 
      as={NextLink} 
      color={lighter ? 'blue.400' : 'blue.500' }
      _hover={{
        color: 'blue.400'
      }}
      {...restProps}
    >
      {children}
    </ChakraLink>
  )
}