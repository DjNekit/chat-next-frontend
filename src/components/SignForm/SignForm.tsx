import { useSigninMutation, useSignupMutation } from '@/redux/api/auth'
import { Box, Button, Fade, Input, ScaleFade, Stack, Text } from '@chakra-ui/react'
import React, { FC, memo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link } from '../Link/Link'

interface SignFormProps { }

export const SignForm: FC<SignFormProps> = memo(() => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [signin, { isLoading }] = useSigninMutation()
  const [signup, {}] = useSignupMutation()
  const { control, handleSubmit, setError } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const changeMode = () => {
    setMode(prev => prev === 'signin' ? 'signup' : 'signin')
  }

  const onSubmit = async (data: any) => {
    (mode === 'signin' 
      ? signin(data) 
      : signup(data)
    )
      .unwrap()
      .catch((error) => {
        setError('email', {
          message: ''
        })
        setError('password', {
          message: error.data.message || 'Invalid credentials'
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
          {mode === 'signin' ? 'Sign In' : 'Sign Up'}
        </Text>
        <ScaleFade in={mode === 'signup'} unmountOnExit>
          <Controller
            name='name'
            control={control}
            rules={{
              required: 'Name is required',
              minLength: {
                value: 3,
                message: 'Name is too short'
              }
            }}
            render={({ field, fieldState: { error } }) =>
              <Box>
                <Input
                  {...field}
                  isInvalid={Boolean(error)}
                  size='lg'
                  color='white'
                  placeholder='Name'
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
        </ScaleFade>
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
          {mode === 'signin' ? 'Sign in' : 'Sign up'}
        </Button>
        <Text textAlign='center' color='white' cursor='default'>
          {mode === 'signin' 
            ? "Don't have account?"
            : "Already have account?"
          }
          {' '}
          <Box 
            as='span' 
            onClick={changeMode}
            cursor='pointer'
            color='blue.400'
          >
            {mode === 'signin' ? 'Sign Up!' : 'Sign In!'}
          </Box>
        </Text>
      </Stack>
    </Box>
  )
})