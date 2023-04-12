import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchContact } from '../../features/contacts/contactsSlice'
import React from 'react'

export default function Search() {
  const searchText = useSelector((state) => state.contacts.searchText)
  const dispatch = useDispatch()
  const handlerSearch = (e) => {
    e.preventDefault()
    dispatch(searchContact(e.target.value))
  }

  return (
    <div>
      <input
        type="text"
        id="simple-search"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Research by name..."
        value={searchText}
        onChange={handlerSearch}
        required
      />
    </div>
  )
}
{
  /* contacts
    .filter((contact) =>
      contactSearch.length >= 3
        ? contact.first_name
            .toLowerCase()
            .includes(contactSearch.toLocaleLowerCase())
        : true
    )
    .map((contact) => (
      <ContactList
        first_name={contact.first_name}
        _id={contact._id}
        email={contact.email}
      />
    )) */
}
