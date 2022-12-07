import { axiosClient } from "@/lib/axios"
import { setAuthTokenInAxios } from "@/lib/setAuthTokenInAxios"

interface Credentials {
  email: string
  password: string
}

export const login = async (credentials: Credentials) => {
  try {
    const res = await axiosClient.post('/api/signin', credentials, {
      baseURL: '/'
    })
    const { accessToken } = res.data
    setAuthTokenInAxios(axiosClient, accessToken)
  } catch(error) {
    return error
  }
}