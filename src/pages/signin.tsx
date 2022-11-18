import { Button, Input, Stack } from "@chakra-ui/react";
import Head from "next/head";
import Router from "next/router";
import { api } from "@/api";
import { Link, SigninLayout } from "@/components";
import { useUser } from "@/hooks/useUser";
import { NextPage } from "next";
import { ReactNode } from "react";

export default function SigninPage() {
  const {user, isLoading, isError, mutate} = useUser()

  if (isLoading) {
    return (
      <h1>Loading...</h1>
    )
  }

  if (user) {
    Router.replace('/chats')
    return (
      <h1>Redirect...</h1>
    )
  }

  const submit = async () => {
    const error = await api.login({
      email: 'test@test.com',
      password: '12345678'
    })

    if (!error) {
      mutate()
      return
    }
  }

  return (
    <div>
      <Head>
        <title>Sign In</title>
      </Head>
      <main>
        <Stack spacing={5}>
          <Link href='/'>To Home page</Link>
          <h1>Sign In page</h1>
          <Input placeholder='Email' size='lg' />
          <Input placeholder='Password' size='lg' />
          <Button onClick={submit}>Sign in</Button>
        </Stack>
      </main>
    </div>
  )
}

SigninPage.getLayout = function getLayout(page: ReactNode) {
  return (
    <SigninLayout>
      {page}
    </SigninLayout>
  )
}