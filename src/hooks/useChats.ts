import useSWR from "swr"

export const useChats = () => {
  const { data, error, mutate } = useSWR('/v1/chats', {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })
  const chats = data?.chats

  return {
    chats,
    isLoading: !chats && !error,
    isError: error?.response || error,
    mutate
  }
}