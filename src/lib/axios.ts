import axios, { AxiosResponse } from "axios";
import { setAuthTokenInAxios } from "./setAuthTokenInAxios";

type ResType = {
  accessToken: string
  refreshToken: string
}

type Method = 'get' | 'post' | 'put' | 'patch' | 'delete'

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  withCredentials: true,
})

//? Интерцептор для автообновления access токена
axiosClient.interceptors.response.use(undefined, async (error) => {
  if (!error?.config) {
    return Promise.reject(error);
  }
  const { url, method, data } = error.config
  const failedRequestBody = data ? JSON.parse(data) : null

  if (error.response.status !== 401 || url === '/api/refresh') {
    return Promise.reject(error);
  }

  const res = await axiosClient.post<null, AxiosResponse<ResType>>(
    '/api/refresh',
    undefined,
    { baseURL: '/' }
  )

  const { accessToken } = res.data

  if (!accessToken) {
    return Promise.reject(error)
  }

  setAuthTokenInAxios(axiosClient, accessToken)

  const retryFailedRequest = await axiosClient[method as Method](url, failedRequestBody)
  return Promise.resolve(retryFailedRequest);
})


