import { useDispatch, useSelector } from 'react-redux'
import React from 'react'
import { TextInput } from '@mantine/core'
import { Search } from '@mui/icons-material'
import { searchContact } from '../../../../../features/contacts/contactsSlice'

const SearchInput = () => {
  const searchText = useSelector((state) => state.contacts.searchText)
  const dispatch = useDispatch()
  const handlerSearch = (e) => {
    e.preventDefault()
    dispatch(searchContact(e.target.value))
  }

  return (
    <div className="w-[40%]">
      <TextInput
        radius={6}
        placeholder="Research by name.."
        icon={<Search />}
        value={searchText}
        onChange={handlerSearch}
        size="md"
      />
    </div>
  )
}

export default SearchInput
