import { axiosClient } from "../lib/axios"

export const getUser = async () => {
  const res = await axiosClient.post('/v1/auth/current-user')
  return res.data || null
}