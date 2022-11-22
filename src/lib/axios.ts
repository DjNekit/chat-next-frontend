import axios, { AxiosResponse } from "axios";
import * as cookie from 'cookie'
import * as setCookie from 'set-cookie-parser'

type ResType = {
  accessToken: string
  refreshToken: string
}

type Method = 'get' | 'post' | 'put' | 'patch' | 'delete'

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  withCredentials: true,
})

axiosClient.interceptors.response.use(undefined, async (error) => {
  console.log(error)
  const { url, method, data } = error.config
  const parsedData = data ? JSON.parse(data) : null
  if (error.response.status !== 401 || url == '/api/refresh') {
    return Promise.reject(error);
  }
  const res = await axiosClient.post<null, AxiosResponse<ResType>>(
    '/api/refresh',
    undefined,
    {
      baseURL: '/'
    }
  )

  if (axiosClient.defaults.headers.setCookie) {
    delete axiosClient.defaults.headers.setCookie
  }

  const { accessToken } = res.data

  if (!accessToken) {
    return Promise.reject(error)
  }
  const bearer = `Bearer ${accessToken}`
  axiosClient.defaults.headers.Authorization = bearer

  const retryFailedRequest = await axiosClient[method as Method](url, parsedData)
  return Promise.resolve(retryFailedRequest);
})


