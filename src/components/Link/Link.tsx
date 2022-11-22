import { Link as ChakraLink, LinkProps as ChakraLinkProps } from '@chakra-ui/react';
import NextLink from 'next/link';
import { FC, ReactNode } from 'react';

interface LinkProps extends Omit<ChakraLinkProps, 'as'> {
  children: ReactNode
}

export const Link: FC<LinkProps> = ({ children, ...restProps }) => {
  return (
    <ChakraLink 
      as={NextLink} 
      color='blue.500' 
      _hover={{
        color: 'blue.400'
      }}
      {...restProps}
    >
      {children}
    </ChakraLink>
  )
}