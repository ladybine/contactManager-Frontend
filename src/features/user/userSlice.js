import { createSlice } from '@reduxjs/toolkit'
import { loginUser, insertUser, getCurrentUser, getAllUsers, getAllLibelles, createLibelle } from './actions'

const initialState = {
  data: null,
  users: [],
  libelles: [],
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
        const { access_token, user } = action.payload
        state.email = user.email
        state.data = user
        localStorage.setItem('token', access_token)
        state.authenticated = true
      })
      .addCase(insertUser.fulfilled, (state, action) => {
        state.users = [...state.users, action.payload]
      })
      .addCase(getCurrentUser.pending, (state, action) => {
        state.authorizing = true
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.authorizing = false
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.data = action.payload
        state.email = state.data.email
        state.authenticated = true
        state.authorizing = false
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload
      })
      .addCase(getAllLibelles.fulfilled, (state, action) => {
        state.libelles = action.payload
      })
      .addCase(createLibelle.fulfilled, (state, action) => {
        state.libelles = [...state.libelles, action.payload]
      })
  },
})

export const { logout } = userSlice.actions

export default userSlice.reducer
