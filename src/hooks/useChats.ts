import useSWR from "swr"

export const useChats = () => {
  const { data: chats, error, mutate } = useSWR('/v1/chats')

  return {
    chats,
    isLoading: !chats && !error,
    isError: error?.response || error,
    mutate
  }
}