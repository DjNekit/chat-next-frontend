import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Box, Button, Input, LightMode, Stack, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Link, Loading, SigninLayout } from "@/components";
import { useSigninMutation, useUserQuery } from "@/redux/api/auth";
import { useAppSelector } from "@/hooks/useAppSelector";
import { motion } from "framer-motion";

export default function SigninPage() {
  const userData = useUserQuery({})
  const router = useRouter()
  const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm()
  const [signin, { isLoading }] = useSigninMutation()
  const { isAuth } = useAppSelector(state => state.auth)

  useEffect(() => {
    if (isAuth) {
      router.replace('/chats')
    }
  }, [isAuth])

  const onSubmit = async (data: any) => {
    signin(data)
      .unwrap()
      .catch(error => setError('submit', error.data))
  }

  const clearSubmitError = () => {
    if (errors.submit) {
      clearErrors('submit')
    }
  }

  if (isAuth || userData.isLoading) {
    return <Loading />
  }

  return (
    <LightMode>
      <Head>
        <title>Sign In</title>
      </Head>
      <SigninLayout>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={5}>
            <Text 
              color='white' 
              fontSize='4xl'
              textAlign='center'
            >
              Signin
            </Text>
            <Input
              {...register('email', { required: true })}
              placeholder='Email'
              size='lg'
              isInvalid={!!errors.submit || !!errors.email}
              onChange={clearSubmitError}
              color='white'
            />
            <Box>
              <Input
                {...register('password', { required: true })}
                placeholder='Password'
                size='lg'
                color='white'
                isInvalid={!!errors.submit || !!errors.password}
                onChange={clearSubmitError}
                type='password'
                autoComplete="true"
              />
              {errors.submit &&
                <Text 
                  as={motion.div} 
                  color='red.500' 
                  mt={1}
                >
                  Email or password is invalide
                </Text>
              }
            </Box>
            <Button 
              type="submit" 
              isLoading={isLoading}
              colorScheme='telegram'
            >
              Sign in
            </Button>
            <Text textAlign='center' color='white'>
              Don't have account? <Link href='/signup' lighter>Sign Up!</Link>
            </Text>
          </Stack>
        </form>
      </SigninLayout>
    </LightMode>
  )
}