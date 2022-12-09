import { axiosClient } from "./axios"

export const fetcher = async (url: string) => {
  const res = await axiosClient.get(url)
  return res.data
}