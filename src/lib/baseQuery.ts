import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '@/redux/store'

export const baseQuery = fetchBaseQuery({
  baseUrl: '/',
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).auth.accessToken
    console.log(accessToken)

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`)
    }

    return headers
  },
  credentials: 'include'
})