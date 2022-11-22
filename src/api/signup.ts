import { axiosClient } from "@/lib/axios"

export const signup = async (data: any) => {
  try {
    const res = await axiosClient.post('/v1/auth/signup', data)
    const { accessToken } = res.data
    const bearer = `Bearer ${accessToken}`
    axiosClient.defaults.headers.Authorization = bearer
  } catch(e) {
    return e
  }
}