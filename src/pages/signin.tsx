import Head from "next/head";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { Button, Input, Stack, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Link, Loading, SigninLayout } from "@/components";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useSigninMutation } from "@/redux/api/auth";
import { useAppSelector } from "@/hooks/useAppSelector";

export default function SigninPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  // const { user, isLogout, isLoading, mutate, isValidating} = useUser()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [signin, { isLoading }] = useSigninMutation()
  const { isAuth } = useAppSelector(state => state.auth)
  console.log(isAuth)

  useEffect(() => {
    if (isAuth) {
      router.replace('/chats')
    }
  }, [isAuth])

  const onSubmit = async (data: any) => {
    signin(data)
  }

  if (isAuth) {
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
            <Button type="submit" isLoading={isLoading}>Sign in</Button>
            <Text textAlign='center'>
              Don't have account? <Link href='/signup'>Sign Up!</Link>
            </Text>
          </Stack>
        </form>
      </SigninLayout>
    </>
  )
}