import Head from "next/head";
import router from "next/router";
import { useEffect } from "react";
import { Button, Input, Text, Stack, Box } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Link } from "@/components/Link";
import { Loading, SigninLayout } from "@/components";
import { api } from "@/api";
import { useSignupMutation } from "@/redux/api/auth";
import { useAppSelector } from "@/hooks/useAppSelector";

export default function SignupPage() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [signup] = useSignupMutation()
  const { isAuth } = useAppSelector(state => state.auth)

  useEffect(() => {
    if (isAuth) {
      router.replace('/chats')
    }
  }, [isAuth])

  if (isAuth) {
    return <Loading />
  }

  const onSubmit = async (data: any) => {
    signup(data)
  }

  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <SigninLayout>
        <Box 
          as={'form'}
          minW='300px'
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack spacing={3}>
            <h1>Hello!</h1>
            <Input
              {...register('name', { required: true })}
              placeholder='Enter username'
              size='lg'
              isInvalid={!!errors.name}
            />
            <Input
              {...register('email', { required: true })}
              placeholder='Email'
              size='lg'
              isInvalid={!!errors.email}
            />
            <Input
              {...register('password', { required: true })}
              placeholder='Password'
              size='lg'
              isInvalid={!!errors.password}
            />
            <Button type='submit'>Sign up</Button>
            <Text textAlign='center'>
              Already have account? <Link href='/signin'>Sign In!</Link>
            </Text>
          </Stack>
        </Box>
      </SigninLayout>
    </>
  )
}