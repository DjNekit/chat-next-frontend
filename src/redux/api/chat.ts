import { api } from "@/lib/api";

export const chatApi = api.injectEndpoints({
  endpoints: build => ({
    search: build.mutation({
      query: (searchValue: string) => ({
        url: `/api/chat/search?value=${searchValue}`
      })
    })
  })
})


export const {
  useSearchMutation
} = chatApi