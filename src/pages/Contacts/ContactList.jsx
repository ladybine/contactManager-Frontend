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
    headerName: 'Email_1',
    flex: 1,
    minWidth: 200,
  },
  {
    field: 'email_2',
    headerName: 'Email_2',
    flex: 1,
    minWidth: 200,
  },
  {
    field: 'phone_1',
    headerName: 'Phone_1',
    flex: 1,
    minWidth: 200,
  },
  {
    field: 'phone_2',
    headerName: 'Phone_2',
    flex: 1,
    minWidth: 200,
  },
  {
    field: 'category',
    headerName: 'Category',
    minWidth: 120,
    editable: true,
  },
  {
    field: 'company',
    headerName: 'Company',
    minWidth: 120,
    editable: true,
  },
  /* {
    field: 'country',
    headerName: 'Country',
    minWidth: 120,
    editable: true,
  }, */
  {
    field: 'country',
    headerName: 'Country',
    editable: true,
    minWidth: 120,
    type: 'singleSelect',
    valueOptions: [
      'Afghanistan',
      'Albanie',
      'Algérie',
      'Andorre',
      'Angola',
      'Antigua-et-Barbuda',
      'Arabie saoudite',
      'Argentine',
      'Arménie',
      'Australie',
      'Autriche',
      'Azerbaïdjan',
      'Bahamas',
      'Bahrain',
      'Bangladesh',
      'Barbade',
      'Belgique',
      'Belize',
      'Bénin',
      'Bhoutan',
      'Biélorussie',
      'Birmanie',
      'Bolivie',
      'Bosnie-Herzégovine',
      'Botswana',
      'Brésil',
      'Brunei',
      'Bulgarie',
      'Burkina Faso',
      'Burundi',
      'Cambodge',
      'Cameroun',
      'Canada',
      ' Cap-Vert',
      ' République centrafricaine',
      ' Chili',
      'Chine',
      'Chypre',
      'Colombie',
      'Comores',
      'Congo-Brazzaville',
      'Congo-Kinshasa',
      ' Corée du Nord',
      'Corée du Sud',
      'Costa Rica',
      'Côte d Ivoire',
      'Croatie',
      ' Cuba',
      ' Danemark',
      ' Djibouti',
      'Dominique',
      'Égypte',
      ' Émirats arabes unis',
      'Équateur',
      'Érythrée',
      'Espagne',
      ' Estonie',
      'États-Unis',
      ' Éthiopie',
      ' Fidji',
      'Finlande',
      'France',
      ' Gabon',
      ' Gambie',
      'Géorgie',
      'Ghana',
      'Grèce',
      'Grenade',
      'Guatemala',
      'Guinée',
      'Guinée équatoriale',
      'Guinée-Bissau',
      'Guyana',
      'Haïti',
      'Honduras',
      'Hongrie',
      'Îles Cook',
      'Îles Marshall',
      ' Inde',
      ' Indonésie',
      ' Iraq',
      'Irlande',
      'Islande',
      ' Israël',
      'Italie',
      'Jamaïque',
      'Japon',
      'Jordanie',
      'Kazakhstan',
      ' Kenya',
      ' Kirghizstan',
      ' Koweït',
      'Laos',
      ' Lesotho',
      'Lettonie',
      'Liban',
      ' Liberia',
      ' Libye',
      ' Liechtenstein',
      'Lituanie',
      'Luxembourg',
      'Macédoine',
      'Madagascar',
      'Malaisie',
      'Malawi',
      ' Maldives',
      ' Mali',
      'Malte',
      'Maroc',
      ' Maurice',
      'Mauritanie',
      'Mexique',
      ' Moldavie',
      ' Monaco',
      'Mongolie',
      'Mozambique',
      ' Namibie',
      ' Népal',
      'Nicaragua',
      ' Niger',
      'Nigeria',
      ' Norvège',
      'Nouvelle Zélande',
      ' Oman',
      'Ouganda',
      'Ouzbékistan',
      'Pakistan',
      'Panama',
      'Papouasie-Nouvelle-Guinée',
      'Paraguay',
      'Pays-Bas',
      'Pérou',
      ' Philippines',
      'Pologne',
      'Portugal',
      ' Qatar',
      ' Roumanie',
      'Royaume-Uni',
      'Russie',
      ' Rwanda',
      'Saint-Kitts-et-Nevis',
      'Sainte-Lucie',
      ' Saint-Vincent-et-les-Grenadines',
      'Salvador',
      ' Samoa',
      'São Tomé-et-Príncipe',
      ' Sénégal',
      'Serbie',
      'Seychelles',
      'Sierra Leone',
      'Singapour',
      ' Slovaquie',
      'Slovénie',
      'Somalie',
      'Soudan',
      'Sri Lanka',
      'Suède',
      'Suisse',
      ' Suriname',
      'Swaziland',
      'Syrie',
      'Tadjikistan',
      'Tanzanie',
      'Tchad',
      'Thaïlande',
      'Togo',
      'Tonga',
      'Trinité-et-Tobago',
      'Tunisie',
      'Turkménistan',
      'Turquie',
      'Tuvalu',
      'Ukraine',
      'Uruguay',
      'Venezuela',
      'Vietnam',
      'Yémen',
      'Zambie',
      'Zimbabwe',
    ],
  },
  {
    field: 'province',
    headerName: 'Province',
    minWidth: 120,
    editable: true,
  },
  {
    field: 'town',
    headerName: 'Town',
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
    headerName: 'Group',
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
              /* pageSize: 500, */
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
        pageSizeOptions={[1, 200]}
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
