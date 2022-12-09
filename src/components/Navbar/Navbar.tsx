import { Avatar, Box, Center } from "@chakra-ui/react"
import { ExitIcon } from "../Icons/ExitIcon"
import { motion } from "framer-motion";
import { api } from "@/api";
import { useRouter } from "next/router";
import { FC, memo } from "react";
import { mutate } from "swr";

interface NavbarProps {
  name: string
  onLogout: () => void
}

export const Navbar: FC<NavbarProps> = memo(({ name, onLogout }) => {
  return (
    <Box
      bg='black'
      h='100%'
      p={4}
      borderRadius='xl'
    >
      <Center 
        flexDirection='column' 
        justifyContent='space-between' 
        h='100%'
      >
        <Avatar 
          name={name}
          backgroundColor='white'
          color='black'
          cursor='pointer'
        />
        <motion.button 
          whileTap={{ scale: 0.9 }} 
          whileHover={{ scale: 1.1 }}
          onClick={onLogout}
        >
          <ExitIcon 
            width='48px' 
            height='48px' 
            cursor='pointer'
            // onClick={onLogout}
          />
        </motion.button>
      </Center>
    </Box>
  )
})