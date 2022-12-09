import Head from "next/head";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { Button, Input, Stack, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { api } from "@/api";
import { Link, Loading, SigninLayout } from "@/components";
import { useUser } from "@/hooks/useUser";

export default function SigninPage() {
  const router = useRouter()
  const { user, isLogout, isLoading, mutate, isValidating} = useUser()
  const { register, handleSubmit, formState: { errors } } = useForm()

  useEffect(() => {
    if (user && !isLogout) {
      router.replace('/chats')
    }
  }, [user, isLogout])

  const onSubmit = async (data: any) => {
    const error = await api.login(data)

    if (!error) {
      mutate()
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
      <SigninLayout>
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
      </SigninLayout>
    </>
  )
}