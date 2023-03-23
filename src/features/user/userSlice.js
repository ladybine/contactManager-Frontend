import { createSlice } from '@reduxjs/toolkit'
import { loginUser, insertUser, isInline } from './actions'

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
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.authenticated = true
        const { access_token } = action.payload
        console.log(action.payload);
        state.token = access_token
        localStorage.setItem('token', access_token)
      })
      .addCase(insertUser.fulfilled, (state, action) => {
        state.authenticated = true
        const { access_token } = action.payload
        console.log(action.payload)
        state.token = access_token
        localStorage.setItem('token', access_token)
      })
      .addCase(isInline.fulfilled, (state, action) => {
        state.data = action.payload
        console.log(action.payload)
      })
  },
})

export const { logout } = userSlice.actions

export default userSlice.reducer
