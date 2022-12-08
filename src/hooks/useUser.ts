import useSWR from "swr"
import { useEffect } from "react";
import { useRouter } from 'next/router';
import { axiosClient } from "@/lib/axios"

interface AuthOptions {
  redirectOnLogin?: boolean
  redirectOnLogout?: boolean
}

const fetcher = async (url: string) => {
  const res = await axiosClient.post(url)
  const user = res.data
  return user
}

export function useUser(options?: AuthOptions) {
  const router = useRouter()
  const { data: user, error, mutate } = useSWR(
    '/v1/auth/current-user/', 
    fetcher, 
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  )

  const isLogout = error?.response.status === 401

  useEffect(() => {
    if (user && !isLogout && options?.redirectOnLogin) {
      router.push('/chats')
    }

    if (isLogout && options?.redirectOnLogout) {
      router.push('/signin')
    }
  }, [user, isLogout])

  return {
    user,
    isLoading: !error && !user,
    isError: error,
    isLogout,
    mutate
  }
}