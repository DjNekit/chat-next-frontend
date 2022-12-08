import { Box, Grid, GridItem } from "@chakra-ui/react"
import Head from "next/head"
import { FC, ReactNode } from "react"
import { Navbar } from "../Navbar/Navbar"

interface ChatLayoutProps {
  title: string
  children: ReactNode
}

export const ChatLayout: FC<ChatLayoutProps> = ({ title, children }) => {
  const onLogout = () => {
    
  }
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Grid
        as='main'
        h='100vh'
        templateRows='1fr 3fr 5fr'
        templateColumns='80px 1fr 2fr'
        gap={4}
        p={4}
        bg='#EFF6FC'
      >
        <GridItem rowSpan={3} colSpan={1}>
          <Navbar onLogout={onLogout}/>
        </GridItem>
        {children}
      </Grid>
    </>
  )
}