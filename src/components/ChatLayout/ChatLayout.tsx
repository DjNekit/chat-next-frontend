import Head from "next/head"
import { FC, memo, ReactNode } from "react"
import { Grid } from "@chakra-ui/react"

interface ChatLayoutProps {
  title: string
  children: ReactNode
}

export const ChatLayout: FC<ChatLayoutProps> = memo(({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Grid
        as='main'
        h='100vh'
        templateRows='40px 3fr 5fr'
        templateColumns='80px 1fr 2fr'
        gap={4}
        p={4}
        // bg='#EFF6FC'
      >
        {children}
      </Grid>
    </>
  )
})