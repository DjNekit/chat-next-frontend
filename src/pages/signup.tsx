import Head from "next/head";
import router from "next/router";
import { useEffect } from "react";
import { Button, Input, Text, Stack, Box } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Link } from "@/components/Link";
import { Loading, SigninLayout } from "@/components";
// import { useUser } from "@/hooks/useUser";
import { api } from "@/api";

export default function SignupPage() {
  // const { user, isLoading, isLogout, mutate } = useUser({
  //   redirectOnLogin: true
  // })
  const { register, handleSubmit, formState: { errors } } = useForm()

  // useEffect(() => {
  //   if (user && !isLogout) {
  //     router.replace('/chats')
  //   }
  // }, [user, isLogout])

  // if (user && !isLogout) {
  //   return <Loading />
  // }

  const onSubmit = async (data: any) => {
    // const error = await api.signup(data)

    // if (!error) {
    //   mutate()
    // }
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