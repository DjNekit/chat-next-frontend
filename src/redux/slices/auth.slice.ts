import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from '@/types';
import { authApi } from '../api/auth';

interface AuthSliceState {
  user: IUser | null
  accessToken: string
  isAuth: boolean
  isFirstLoading: boolean
}

const initialState: AuthSliceState = {
  user: null,
  accessToken: '',
  isAuth: false,
  isFirstLoading: true,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload
      state.isFirstLoading = false
      state.isAuth = true
    },
    signout: () => {
      return {...initialState, isFirstLoading: false}
    }
  },
  extraReducers(builder) {
    builder
      .addMatcher(authApi.endpoints.signin.matchFulfilled, (state, { payload }) => {
        const { accessToken } = payload
        state.accessToken = accessToken
        state.isAuth = true
      })

    builder
      .addMatcher(authApi.endpoints.signup.matchFulfilled, (state, { payload }) => {
        const { accessToken } = payload
        state.accessToken = accessToken
        state.isAuth = true
      })
    
    builder
      .addMatcher(authApi.endpoints.user.matchFulfilled, (state, { payload }) => {
        state.user = payload
      })

    builder
      .addMatcher(authApi.endpoints.signout.matchFulfilled, (state, { payload }) => {
        return { ...initialState, isFirstLoading: false}
      })

    builder
      .addMatcher(authApi.endpoints.refreshTokens.matchFulfilled, (state, { payload }) => {
        state.accessToken = payload.accessToken
      })
      .addMatcher(authApi.endpoints.refreshTokens.matchRejected, () => {
        return initialState
      })
  },
})

export const authReducer = authSlice.reducer
export const authActions = authSlice.actions