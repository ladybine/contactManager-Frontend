import { createAsyncThunk } from '@reduxjs/toolkit'
import client from '../../utils/client'

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }) => {
    const { data } = await client().post('/auth/login/', { email, password })
    return data
  }
)
