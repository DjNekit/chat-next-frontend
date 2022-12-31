import Head from "next/head";
import router from "next/router";
import { useEffect } from "react";
import { Button, Input, Text, Stack, Box } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Link } from "@/components/Link";
import { Loading, SigninLayout } from "@/components";
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
      .unwrap()
      .catch(error => setError('submit', error.data))
  }

  const clearSubmitError = () => {
    if (errors.submit) {
      clearErrors('submit')
    }
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
              onChange={clearSubmitError}
            />
            <Input
              {...register('email', { required: true })}
              placeholder='Email'
              size='lg'
              isInvalid={!!errors.email}
              onChange={clearSubmitError}
            />
            <Input
              {...register('password', { required: true })}
              placeholder='Password'
              size='lg'
              isInvalid={!!errors.password}
              onChange={clearSubmitError}
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

function setError(arg0: string, data: any): any {
  throw new Error("Function not implemented.");
}
function clearErrors(arg0: string) {
  throw new Error("Function not implemented.");
}

