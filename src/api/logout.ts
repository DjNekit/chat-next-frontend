import { setAuthTokenInAxios } from '@/lib/setAuthTokenInAxios';
import { axiosClient } from "@/lib/axios"

export const logout = async () => {
  await axiosClient.post('/v1/auth/logout')
  setAuthTokenInAxios(axiosClient, '')
}