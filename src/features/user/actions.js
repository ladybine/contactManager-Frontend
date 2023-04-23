import { createAsyncThunk } from '@reduxjs/toolkit'
import client from '../../utils/client'

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }) => {
    const { data } = await client().post('/auth/login', { email, password })
    return data
  }
)
export const insertUser = createAsyncThunk(
  'user/signup',
  async ({ email, password }) => {
    const { data } = await client().post('/auth/signup', { email, password })
    return data
  }
)
export const getCurrentUser = createAsyncThunk('user/current', async () => {
  const { data } = await client().get('/users/current')
  return data
})
