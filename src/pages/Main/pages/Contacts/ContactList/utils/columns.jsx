import { Avatar } from '@mantine/core'
import { countries } from './countries'
import { randomColor } from '../../../../../../utils/color'

export const columns = [
  {
    accessorKey: 'fullname',
    header: 'Full Name',
    flex: 1,
    enableEditing: false,
    filterable: false,
    Cell: ({ row: contact }) => {
      return (
        <div className="flex items-center cursor-pointer">
          <Avatar
            color={randomColor()}
            /* style={{
              color: ,
            }} */
            radius="xl"
          >
            {contact.original.first_name?.[0]}
            {contact.original.last_name ? contact.original.last_name[0] : ''}
          </Avatar>
          {/*  <img
            className="w-10 h-10 rounded-full mr-2"
            src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
            alt="Jese image"
          /> */}
          <span className="ml-2">{`${contact.original.first_name} ${contact.original.last_name}`}</span>
        </div>
      )
    },
    minWidth: 250,
  },
  {
    accessorKey: 'first_name',
    header: 'First Name',
    flex: 1,
    minWidth: 120,
    enableEditing: true,
  },
  {
    accessorKey: 'middle_name',
    header: 'Middle Name',
    flex: 1,
    minWidth: 120,
    enableEditing: true,
  },
  {
    accessorKey: 'last_name',
    header: 'Last Name',
    flex: 1,
    minWidth: 120,
    enableEditing: true,
  },
  {
    accessorKey: 'email_1',
    header: 'Email_1',
    enableClickToCopy: true,
    flex: 1,
    minWidth: 200,
  },
  {
    accessorKey: 'email_2',
    header: 'Email_2',
    enableClickToCopy: true,
    flex: 1,
    minWidth: 200,
  },
  {
    accessorKey: 'phone_1',
    header: 'Phone_1',
    enableClickToCopy: true,
    flex: 1,
    minWidth: 200,
  },
  {
    accessorKey: 'phone_2',
    header: 'Phone_2',
    enableClickToCopy: true,
    flex: 1,
    minWidth: 200,
  },
  {
    accessorKey: 'category',
    header: 'Category',
    minWidth: 120,
    enableEditing: true,
    editVariant: 'select',
    editSelectOptions: [
      { text: 'G1', value: 'G1' },
      { text: 'G2', value: 'G2' },
      { text: 'G3', value: 'G3' },
    ],
    valueOptions: ['G1', 'G2', 'G3'],
  },
  {
    accessorKey: 'company',
    header: 'Company',
    minWidth: 120,
    enableEditing: true,
  },
  /* {
    accessorKey: 'country',
    header: 'Country',
    minWidth: 120,
    enableEditing: true,
  }, */
  {
    accessorKey: 'country',
    header: 'Country',
    enableEditing: true,
    minWidth: 120,
    editVariant: 'select',
    editSelectOptions: countries,
  },
  {
    accessorKey: 'province',
    header: 'Province',
    minWidth: 120,
    enableEditing: true,
  },
  {
    accessorKey: 'town',
    header: 'Town',
    minWidth: 120,
    enableEditing: true,
  },
  {
    accessorKey: 'adress',
    header: 'Adress',
    minWidth: 120,
    enableEditing: true,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    enableEditing: true,
    minWidth: 120,
    editVariant: 'select',
    editSelectOptions: [
      'FlashApp User',
      'Flash Agent',
      'Flash Marchand',
      'Flash Sub-agency',
      'Client',
    ],
  },
  {
    accessorKey: 'groupe',
    header: 'Group',
    minWidth: 120,
    enableEditing: true,
    editVariant: 'select',
    editSelectOptions: ['List mailings', 'List Sub agent', 'List Partners'],
  },
  {
    accessorKey: 'flashApId',
    header: 'FlashApp ID',
    minWidth: 120,
    enableEditing: true,
  },
]
