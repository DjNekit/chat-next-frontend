import { useSigninMutation } from '@/redux/api/auth'
import { Box, Button, Fade, Input, Stack, Text } from '@chakra-ui/react'
import React, { FC, memo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link } from '../Link/Link'

interface SignFormProps { }

export const SignForm: FC<SignFormProps> = memo(() => {
  const [signin, { isLoading }] = useSigninMutation()
  const { control, handleSubmit, setError } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: any) => {
    signin(data)
      .unwrap()
      .catch(() => {
        setError('email', {
          message: ''
        })
        setError('password', {
          message: 'Invalid credentials'
        })
      })
  }

  return (
    <Box as='form' onSubmit={handleSubmit(onSubmit)} w='280px'>
      <Stack spacing={5}>
        <Text
          color='white'
          fontSize='4xl'
          textAlign='center'
        >
          Signin
        </Text>
        <Controller
          name='email'
          control={control}
          rules={{
            required: 'Email is required',
          }}
          render={({ field, fieldState: { error } }) =>
            <Box>
              <Input
                {...field}
                isInvalid={Boolean(error)}
                size='lg'
                color='white'
                placeholder='Email'
              />
              <Fade in={Boolean(error)} unmountOnExit>
                <Text
                  color='red.500'
                  mt={1}
                >
                  {error?.message}
                </Text>
              </Fade>
            </Box>
          }
        />
        <Box>
          <Controller
            name="password"
            control={control}
            rules={{
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Invalide password length'
              }
            }}
            render={({ field, fieldState: { error } }) =>
              <Box>
                <Input
                  {...field}
                  isInvalid={Boolean(error)}
                  size='lg'
                  color='white'
                  type='password'
                  autoComplete="true"
                  placeholder='Password'
                />
                <Fade in={Boolean(error)} unmountOnExit>
                  <Text
                    color='red.500'
                    mt={1}
                  >
                    {error?.message}
                  </Text>
                </Fade>
              </Box>
            }
          />
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
    </Box>
  )
})