import Head from "next/head";
import { ReactNode, useEffect } from "react";
import { Button, Input, Stack, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { api } from "@/api";
import { Link, Loading, SigninLayout } from "@/components";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/router";

export default function SigninPage() {
  const router = useRouter()
  const { user, isLogout, isLoading, mutate } = useUser()
  const { register, handleSubmit, formState: { errors } } = useForm()
  console.log('signin', user, isLogout, isLoading)

  useEffect(() => {
    if (user && !isLogout) {
      router.replace('/chats')
    }
  }, [user, isLogout])

  const onSubmit = async (data: any) => {
    const error = await api.login(data)

    if (!error) {
      await mutate()
      return
    }
  }

  if (user && !isLogout) {
    return <Loading />
  }

  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={5}>
          <h1>Sign In page</h1>
          <Input
            {...register('email', { required: true })}
            placeholder='Email'
            size='lg'
          />
          <Input
            {...register('password', { required: true })}
            placeholder='Password'
            size='lg'
          />
          <Button type="submit">Sign in</Button>
          <Text textAlign='center'>
            Don't have account? <Link href='/signup'>Sign Up!</Link>
          </Text>
        </Stack>
      </form>
    </>
  )
}

SigninPage.getLayout = function getLayout(page: ReactNode) {
  return (
    <SigninLayout>
      {page}
    </SigninLayout>
  )
}