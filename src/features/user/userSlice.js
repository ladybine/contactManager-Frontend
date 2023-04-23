import { createSlice } from '@reduxjs/toolkit'
import { loginUser, insertUser, getCurrentUser } from './actions'

const initialState = {
  authenticated: false,
  authorizing: true,
  email: '',
  token: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.clear()
      state.authenticated = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.authenticated = true
        const { access_token, user } = action.payload
        state.email = user.email
        localStorage.setItem('token', access_token)
      })
      .addCase(insertUser.fulfilled, (state, action) => {
        state.authenticated = true
        const { access_token } = action.payload
        console.log(action.payload)
        state.token = access_token
        localStorage.setItem('token', access_token)
      })
      .addCase(getCurrentUser.pending, (state, action) => {
        state.authorizing = true
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.authorizing = false
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.data = action.payload
        state.authenticated = true
        state.authorizing = false
      })
  },
})

export const { logout } = userSlice.actions

export default userSlice.reducer
