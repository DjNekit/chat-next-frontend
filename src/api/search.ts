import { axiosClient } from "@/lib/axios"

export const search = async (value: string) => {
  const res = await axiosClient(`/v1/users?value=${value}`)
}