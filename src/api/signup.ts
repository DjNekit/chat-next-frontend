import { axiosClient } from "@/lib/axios"
import { setAuthTokenInAxios } from "@/lib/setAuthTokenInAxios"

export const signup = async (data: any) => {
  try {
    const res = await axiosClient.post('/v1/auth/signup', data)
    const { accessToken } = res.data
    setAuthTokenInAxios(axiosClient, accessToken)
  } catch(e) {
    return e
  }
}