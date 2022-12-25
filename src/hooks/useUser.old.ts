import useSWR from "swr"

export function useUser(options?: any) {
  const { data: user, error, mutate, isValidating } = useSWR(
    '/v1/auth/current-user/', 
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )
  const isLogout = error?.response.status === 401

  return {
    user,
    isLoading: !error && !user,
    error: error,
    isLogout,
    isValidating,
    mutate
  }
}