import { createAsyncThunk } from '@reduxjs/toolkit'
import client from '../../utils/client'

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const { data } = await client().post('/auth/login', { email, password })
      return data
    } catch (error) {
      if (error.response?.status === 401) {
        return thunkAPI.rejectWithValue('Invalid email or password')
      } else {
        return thunkAPI.rejectWithValue('Network error')
      }
    }
  }
)

export const getAllUsers = createAsyncThunk('user/all', async () => {
  const { data } = await client().get('/users/')
  return data
})

export const insertUser = createAsyncThunk(
  'user/signup',
  async ({ email, password, fullname, role }) => {
    await client().post('/auth/signup', { email, password, role, fullname })
    return { email, password, role, fullname }
  }
)
export const getCurrentUser = createAsyncThunk('user/current', async () => {
  const { data } = await client().get('/users/current')
  return data
})

export const createLibelle = createAsyncThunk(
  'user/create/libelle',
  async ({ name }) => {
    const { data } = await client().post('/libelle', { name })
    return data
  }
)

export const getAllLibelles = createAsyncThunk('user/libelles', async () => {
  const { data } = await client().get('/libelle')
  return data
})