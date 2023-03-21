import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarColumnsButton,
} from '@mui/x-data-grid'
import { Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllContacts, updateContact } from '../../features/contacts/action'
import { setSelectedContacts } from '../../features/contacts/contactsSlice'
import { useDisclosure } from '@mantine/hooks'
import { Drawer } from '@mantine/core'
import { Avatar } from '@mantine/core'
import { randomColor } from '../../utils/color'
import ContactDetails from './ContactDetails'

const columns = [
  {
    field: 'fullname',
    headerName: 'Full Name',
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
    field: 'first_name',
    headerName: 'First Name',
    flex: 1,
    minWidth: 120,
    editable: true,
  },
  {
    field: 'middle_name',
    headerName: 'Middle Name',
    flex: 1,
    minWidth: 120,
    editable: true,
  },
  {
    field: 'last_name',
    headerName: 'Last Name',
    flex: 1,
    minWidth: 120,
    editable: true,
  },
  {
    field: 'email_1',
    headerName: 'Email',
    flex: 1,
    minWidth: 200,
  },
  {
    field: 'phone_1',
    headerName: 'Téléphone',
    flex: 1,
    minWidth: 200,
  },
  {
    field: 'category',
    headerName: 'Catégorie',
    minWidth: 120,
    editable: true,
  },
  {
    field: 'company',
    headerName: 'Compagnie',
    minWidth: 120,
    editable: true,
  },
  {
    field: 'country',
    headerName: 'Pays',
    minWidth: 120,
    editable: true,
  },
  {
    field: 'province',
    headerName: 'Province',
    minWidth: 120,
    editable: true,
  },
  {
    field: 'town',
    headerName: 'Ville',
    minWidth: 120,
    editable: true,
  },
  {
    field: 'adress',
    headerName: 'Adress',
    minWidth: 120,
    editable: true,
  },
  {
    field: 'status',
    headerName: 'Status',
    editable: true,
    minWidth: 120,
  },
  {
    field: 'groupe',
    headerName: 'Groupe',
    minWidth: 120,
    editable: true,
  },
  {
    field: 'flashApId',
    headerName: 'FlashApp ID',
    minWidth: 120,
    editable: true,
  },
]

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      {/* <GridToolbarExport /> */}
    </GridToolbarContainer>
  )
}

const ContactList = ({ onFilterModelChange }) => {
  const { data: contacts, searchText } = useSelector((state) => state.contacts)
  const [selectedId, setSelectedId] = useState()
  const dispatch = useDispatch()

  const [opened, { open, close }] = useDisclosure(false)

  const drawerContact = contacts?.find((contact) => contact.id === selectedId)

  useEffect(() => {
    dispatch(getAllContacts())
  }, [])

  const onCellEditCommit = (cellData, event) => {
    const { id, field, value } = cellData

    console.log(cellData.value)
  }
  const processRowUpdate = (newRow, oldRow) => {
    let updatedKey
    let updatedValue
    for (const key of Object.keys(newRow)) {
      if (newRow[key] !== oldRow[key]) {
        updatedKey = key
        updatedValue = newRow[updatedKey]
        break
      }
    }
    const { id } = newRow
    console.log(updatedValue)
    if (updatedKey && updatedValue) {
      dispatch(updateContact({ key: updatedKey, value: updatedValue, id }))
      return newRow
    }
    return oldRow
  }

  const handleRowSelection = (rowSelectionModel) => {
    // rowSelectionModel est une liste des id des contacts selectionnées
    // on enregistre ça dans le store
    dispatch(setSelectedContacts(rowSelectionModel))
  }

  const displayableContacts =
    searchText.length >= 2
      ? contacts?.filter((contact) =>
          `${contact.first_name.toLowerCase()} ${
            contact.middle_name?.toLowerCase() || ''
          } ${contact.last_name?.toLowerCase() || ''}`.includes(
            searchText.toLowerCase()
          )
        )
      : contacts

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <DataGrid
        columns={columns}
        rows={displayableContacts || []}
        getRowId={(row) => row.id}
        autoHeight={true}
        slots={{ toolbar: CustomToolbar }}
        slotProps={{
          toolbar: {},
        }}
        onFilterModelChange={(model) => {
          if (model.items < 1) {
            onFilterModelChange({ field: '', operator: '', value: '' })
          } else {
            const item = model.items[0]
            console.log(item)
            onFilterModelChange({
              field: item.field,
              operator: item.operator,
              value: item.value,
            })
          }
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
          // columns: {
          //   columnVisibilityModel: {
          //     phone_2: false,
          //   },
          // },
        }}
        checkboxSelection
        onRowSelectionModelChange={handleRowSelection}
        disableRowSelectionOnClick
        onCellEditStop={processRowUpdate}
        processRowUpdate={processRowUpdate}
        experimentalFeatures={{ newEditingApi: true }}
        onProcessRowUpdateError={(error) => console.log(error)}
        pageSizeOptions={[5, 10]}
        onCellDoubleClick={(params) => {
          if (params.field !== 'fullname') return
          setSelectedId(params.id)
          open()
        }}
      />
      {drawerContact && (
        <Drawer
          opened={opened}
          onClose={close}
          title={'Details du contacts'}
          position="right"
          transitionProps={{
            duration: 500,
          }}
        >
          <ContactDetails contact={drawerContact} />
        </Drawer>
      )}
    </div>
  )
}

export default ContactList
