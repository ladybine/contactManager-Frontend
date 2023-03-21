import { createSlice } from '@reduxjs/toolkit'
import { loginUser } from './actions'

const initialState = {
  authenticated: false,
  token: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state, action) => {
      state.authenticated = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.authenticated = true
      const { access_token } = action.payload
      state.token = access_token
      localStorage.setItem('token', access_token)
    })
  },
})

export const { logout } = userSlice.actions

export default userSlice.reducer
