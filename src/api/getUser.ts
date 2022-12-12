import { axiosClient } from "@/lib/axios"
import { IUser } from "@/types"
import { AxiosResponse } from "axios"

export const getUser = async () => {
  const res = await axiosClient.post<null, AxiosResponse<IUser>>('/v1/auth/current-user')
  return res.data || null
}