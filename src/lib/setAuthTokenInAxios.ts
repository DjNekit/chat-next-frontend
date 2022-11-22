import type { AxiosInstance } from "axios";

export const setAuthTokenInAxios = (axiosInstance: AxiosInstance, accessToken: string) => {
  const bearer = `Bearer ${accessToken}`
  axiosInstance.defaults.headers.Authorization = bearer
}