import axios from "axios"
import { axiosClient } from "@/lib/axios"
import { setAuthTokenInAxios } from "@/lib/setAuthTokenInAxios"

interface Credentials {
  email: string
  password: string
}

export const login = async (credentials: Credentials) => {
  try {
    const res = await axios.post('/api/signin', credentials)
    const { accessToken } = res.data
    setAuthTokenInAxios(axiosClient, accessToken)
  } catch(error) {
    return error
  }
}