import React from 'react'
import AddContact from '../../../../Contacts/AddContact'
import { Drawer } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

const CreateContactButton = () => {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <button
        className="flex items-center justify-center bg-white border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-sm font-medium text-gray-700 py-2 px-4 rounded-lg"
        onClick={open}
      >
        <svg
          className="-ml-1 mr-2 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Create contact
      </button>
      <Drawer
        opened={opened}
        onClose={close}
        title={'Add a new contact'}
        position="right"
        transitionProps={{
          duration: 500,
        }}
      >
        <AddContact />
      </Drawer>
    </>
  )
}

export default CreateContactButton
