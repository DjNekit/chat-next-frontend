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
    }),
    chatById: build.mutation({
      query: (id) => ({
        url: `/api/chat/getChats?companionId=${id}`
      })
    })
  })
})


export const {
  useSearchMutation,
  useChatsQuery,
  useChatByIdMutation
} = chatApi