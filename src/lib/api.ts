import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi } from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'
import { authActions } from '../redux/slices/auth.slice'
import { baseQuery } from './baseQuery'

const mutex = new Mutex()

export const authFetch: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock()
  let result: any = await baseQuery(args, api, extraOptions)

  if (result.error?.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()


      try {
        const refreshResult = await baseQuery(
          { 
            url: '/api/auth/refresh',
            method: 'POST'
          }, 
          api, 
          extraOptions
        )
        console.log(refreshResult)

        const accessToken = (refreshResult.data as any).accessToken

        if (accessToken) {
          api.dispatch(authActions.setToken(accessToken))
          result = await baseQuery(args, api, extraOptions)
        } else {
          api.dispatch(authActions.signout())
        }
      } catch(e) {
        api.dispatch(authActions.signout())
      } finally {
        release()
      }
    } else {
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }
  
  return result
}

export const api = createApi({
  reducerPath: 'splitApi',
  baseQuery: authFetch,
  endpoints: () => ({}),
})