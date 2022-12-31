process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import { api } from "@/lib/api";

export const authApi = api.injectEndpoints({
  endpoints: build => ({
    signin: build.mutation({
      query: (credentials) => ({
        url: '/api/auth/signin',
        method: 'POST',
        body: credentials
      })
    }),
    signup: build.mutation({
      query: (credentials) => ({
        url: '/api/auth/signup',
        method: 'POST',
        body: credentials
      })
    }),
    signout: build.mutation({
      query: () => ({
        url: '/api/auth/signout',
        method: 'POST'
      })
    }),
    user: build.query({
      query: () => ({
        url: '/api/auth/current-user'
      })
    }),
    refreshTokens: build.query({
      query: () => ({
        url: '/api/auth/refresh',
        method: 'POST'
      })
    })

  })
})

export const {
  useSignoutMutation,
  useSigninMutation,
  useSignupMutation,
  useUserQuery
} = authApi