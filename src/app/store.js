import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import contactsReducder from '../features/contacts/contactsSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    contacts: contactsReducder,
  },
})
