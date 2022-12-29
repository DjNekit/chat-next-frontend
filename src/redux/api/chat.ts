import { api } from "@/lib/api";

export const chatApi = api.injectEndpoints({
  endpoints: build => ({
    search: build.mutation({
      query: (searchValue: string) => ({
        url: `/api/chat/search?value=${searchValue}`
      })
    }),
    chats: build.query({
      query: () => ({
        url: '/api/chat/getChats'
      })
    })
  })
})


export const {
  useSearchMutation,
  useChatsQuery
} = chatApi