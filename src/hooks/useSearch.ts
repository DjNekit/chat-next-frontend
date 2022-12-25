import useSWR from "swr"

export const useSearch = (searchValue: string) => {
  const needFetch = searchValue.length > 2

  const { data, error, mutate } = useSWR(
    needFetch ? `/v1/users?value=${searchValue}` : null
  )

  return {
    data,
    showData: needFetch && data && !error,
    isLoading: !data && !error,
    mutate
  }
}