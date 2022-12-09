import Head from "next/head";
import { ReactNode } from "react";
import { Button, Input, Stack, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { api } from "@/api";
import { Link, SigninLayout } from "@/components";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/router";

export default function SigninPage() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const router = useRouter()

  const onSubmit = async (data: any) => {
    const error = await api.login(data)

    if (!error) {
      router.push('/chats')
      return
    }
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