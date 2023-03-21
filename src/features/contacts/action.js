import { createAsyncThunk } from '@reduxjs/toolkit'
import client from '../../utils/client'

export const uploadFile = createAsyncThunk('contacts/upload', async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  const { data } = await client().post('/contacts/excel', formData)
  return data
})

export const exportFile = createAsyncThunk('contacts/export', async (file) => {
  const formData = new FormData()
  formData.get('file', file)
  const { data } = await client().get('contacts/excel', formData)
  return data
})

export const getAllContacts = createAsyncThunk('contacts/get_all', async () => {
  const { data } = await client().get('/contacts')
  return data
})

export const deleteManyContacts = createAsyncThunk(
  'contacts/delete',
  async ({ ids }) => {
    const { data } = await client().delete('/contacts', {
      data: { ids },
    })
    return data
  }
)

export const addContacts = createAsyncThunk(
  'contacts/create',
  async ({
    first_name,
    last_name,
    middle_name,
    emails,
    country,
    town,
    province,
    adress,
    company,
    groupe,
    flashApId,
    phones,
    status,
    category,
  }) => {
    const { data } = await client().post('/contacts', {
      first_name,
      last_name,
      middle_name,
      emails,
      country,
      town,
      province,
      adress,
      company,
      groupe,
      flashApId,
      phones,
      status,
      category,
    })
    return data
  }
)
export const clean = createAsyncThunk('contacts/clean', async () => {
  const { data } = await client().put('/contacts/clean')
  return data
})

export const updateContact = createAsyncThunk(
  'contacts/update',
  async ({ key, value, id }) => {
    const { data } = await client().put('/contacts/update', { key, value, id })
    return data
  }
)
