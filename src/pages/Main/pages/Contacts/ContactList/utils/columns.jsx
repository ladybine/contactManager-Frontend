import { countries } from "./countries"

export const columns = [
  {
    accessorKey: 'fullname',
    header: 'Full Name',
    flex: 1,
    editable: false,
    filterable: false,
    renderCell: ({ row: contact }) => {
      return (
        <div className="flex items-center cursor-pointer">
          <Avatar
            color={randomColor()}
            /* style={{
              color: ,
            }} */
            radius="xl"
          >
            {contact.first_name[0]}
            {contact.last_name ? contact.last_name[0] : ''}
          </Avatar>
          {/*  <img
            className="w-10 h-10 rounded-full mr-2"
            src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
            alt="Jese image"
          /> */}
          <span className="ml-2">{`${contact.first_name} ${contact.last_name}`}</span>
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
    editable: true,
  },
  {
    accessorKey: 'middle_name',
    header: 'Middle Name',
    flex: 1,
    minWidth: 120,
    editable: true,
  },
  {
    accessorKey: 'last_name',
    header: 'Last Name',
    flex: 1,
    minWidth: 120,
    editable: true,
  },
  {
    accessorKey: 'email_1',
    header: 'Email_1',
    flex: 1,
    minWidth: 200,
  },
  {
    accessorKey: 'email_2',
    header: 'Email_2',
    flex: 1,
    minWidth: 200,
  },
  {
    accessorKey: 'phone_1',
    header: 'Phone_1',
    flex: 1,
    minWidth: 200,
  },
  {
    accessorKey: 'phone_2',
    header: 'Phone_2',
    flex: 1,
    minWidth: 200,
  },
  {
    accessorKey: 'category',
    header: 'Category',
    minWidth: 120,
    editable: true,
    type: 'singleSelect',
    valueOptions: ['G1', 'G2', 'G3'],
  },
  {
    accessorKey: 'company',
    header: 'Company',
    minWidth: 120,
    editable: true,
  },
  /* {
    accessorKey: 'country',
    header: 'Country',
    minWidth: 120,
    editable: true,
  }, */
  {
    accessorKey: 'country',
    header: 'Country',
    editable: true,
    minWidth: 120,
    type: 'singleSelect',
    valueOptions: countries,
  },
  {
    accessorKey: 'province',
    header: 'Province',
    minWidth: 120,
    editable: true,
  },
  {
    accessorKey: 'town',
    header: 'Town',
    minWidth: 120,
    editable: true,
  },
  {
    accessorKey: 'adress',
    header: 'Adress',
    minWidth: 120,
    editable: true,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    editable: true,
    minWidth: 120,
    type: 'singleSelect',
    valueOptions: [
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
    editable: true,
    type: 'singleSelect',
    valueOptions: ['List mailings', 'List Sub agent', 'List Partners'],
  },
  {
    accessorKey: 'flashApId',
    header: 'FlashApp ID',
    minWidth: 120,
    editable: true,
  },
]
