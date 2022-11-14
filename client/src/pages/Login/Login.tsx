import { ApolloError } from '@apollo/client'
import { Alert, AlertIcon, Box, Button, FormLabel, Input } from '@chakra-ui/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../../generated/graphql'
import { setAccessToken } from '../../helpers/LocalStorage/AccessToken'

interface LoginFormData {
  login: string
  password: string
}

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormData>()
  const [mutate, { loading, error }] = useLoginMutation()
  const navigate = useNavigate()

  const submitHandler = async ({ login, password }: LoginFormData) => {
    try {
      const res = await mutate({ variables: { data: { login, password } } })
      if (res.data?.login) {
        setAccessToken(res.data.login.accessToken)
        navigate('/home')
      }
    } catch (error) {
      if (error instanceof ApolloError) {
        console.log('error', error.graphQLErrors)
      }
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col justify-center items-center gap-4 border-2 p-4 rounded-lg"
      >
        <Box>Авторизация</Box>
        <Box>
          <FormLabel>Логин</FormLabel>
          <Input placeholder="Логин" {...register('login', { required: true })} />
        </Box>
        <Box>
          <FormLabel>Пароль</FormLabel>
          <Input placeholder="Пароль" {...register('password', { required: true })} />
        </Box>
        <Box>
          {error && (
            <Alert status="error" className="rounded-md">
              <AlertIcon />
              {error.message}
            </Alert>
          )}
        </Box>
        <Box>
          <Button type="submit" disabled={loading} className="w-[150px]">
            Войти
          </Button>
        </Box>
      </form>
    </div>
  )
}

export default Login
