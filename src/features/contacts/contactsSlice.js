import { createSlice } from '@reduxjs/toolkit'
import {
  getAllContacts,
  uploadFile,
  exportFile,
  addContacts,
  clean,
  updateContact,
  deleteManyContacts,
} from './action'

const initialState = {
  data: [],
  selected: [],
  searchText: '',
  deletingContacts: false,
  loadingContact: false
}

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    searchContact: (state, action) => {
      state.searchText = action.payload
    },
    setSelectedContacts: (state, { payload }) => {
      state.selected = payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.data = action.payload
      })
      .addCase(getAllContacts.fulfilled, (state, action) => {
        state.data = action.payload
        state.loadingContact = false
      })
      .addCase(getAllContacts.pending, (state) => {
        state.loadingContact = true
      })
      .addCase(getAllContacts.rejected, (state) => {
        state.loadingContact = false
      })
      .addCase(clean.pending, (state) => {
        state.loadingContact = true;
      })
      .addCase(clean.rejected, (state) => {
        state.loadingContact = false;
      })
      .addCase(clean.fulfilled, (state, action) => {
        state.data = action.payload
        state.loadingContact = false;
      })
      .addCase(exportFile.fulfilled, (state, action) => {
        state.data = action.payload
      })
      .addCase(addContacts.fulfilled, (state, action) => {
        state.data = [...state.data, action.payload]
      })
      .addCase(deleteManyContacts.pending, (state) => {
        state.deletingContacts = true
      })
      .addCase(deleteManyContacts.rejected, (state) => {
        state.deletingContacts = false
      })
      .addCase(deleteManyContacts.fulfilled, (state, { payload }) => {
        state.data = [...state.data].filter(
          (contact) => !payload.includes(contact.id)
        )
        state.deletingContacts = false
      })
      .addCase(updateContact.fulfilled, (state, { payload }) => {
        state.data = [...state.data].map((contact) =>
          contact.id === payload.id ? payload : contact
        )
      })
  },
})

export const {} = contactsSlice.reducer
export const { searchContact, setSelectedContacts } = contactsSlice.actions

export default contactsSlice.reducer
