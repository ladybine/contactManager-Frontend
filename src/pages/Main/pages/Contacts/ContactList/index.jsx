import MaterialReactTable from 'material-react-table'
import { ExportToCsv } from 'export-to-csv'
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material'
import { CloudDownload, Delete, Edit, FileDownload } from '@mui/icons-material'
import { utils, writeFile } from 'xlsx'
import { columns } from './utils/columns'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import {
  deleteManyContacts,
  getAllContacts,
  updateContact,
} from '../../../../../features/contacts/action'
import { Drawer } from '@mantine/core'
import ContactDetails from '../../../../Contacts/ContactDetails'
import { useDisclosure } from '@mantine/hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faTrash } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'

// function CustomToolbar() {
//   return (
//     <GridToolbarContainer>
//       <GridToolbarColumnsButton />
//       <GridToolbarFilterButton />
//       <GridToolbarDensitySelector />
//       {/* <GridToolbarExport /> */}
//     </GridToolbarContainer>
//   )
// }

const csvOptions = {
  fieldSeparator: ',',
  quoteStrings: '"',
  decimalSeparator: '.',
  showLabels: true,
  useBom: true,
  useKeysAsHeaders: false,
  headers: columns.map((c) => c.header),
}

const csvExporter = new ExportToCsv(csvOptions)

const ContactList = () => {
  const dispatch = useDispatch()
  const {
    loadingContact,
    deletingContacts,
    data: contacts,
    searchText,
  } = useSelector((state) => state.contacts)

  const [rowSelection, setRowSelection] = useState({})

  const [selectedId, setSelectedId] = useState()
  const [openedContact, { open: openContact, close: closeContact }] =
    useDisclosure(false)

  const drawerContact = contacts?.find((contact) => contact.id === selectedId)

  const [anchorElMenu, setAnchorElMenu] = useState(null)
  const openDownloadMenu = Boolean(anchorElMenu)
  const handleMenuClick = (event) => {
    setAnchorElMenu(event.currentTarget)
  }
  const handleMenuClose = () => {
    setAnchorElMenu(null)
  }

  useEffect(() => {
    dispatch(getAllContacts())
  }, [])

  const handleExportRows = (rows) => {
    csvExporter.generateCsv(rows.map((row) => row.original))
  }

  const handleExportData = () => {
    csvExporter.generateCsv(data)
  }

  const exportToExcel = (rows) => {
    const fileName = 'myData.xlsx'

    // Create a new workbook and worksheet
    const workbook = utils.book_new()
    const worksheet = utils.json_to_sheet(rows.map((row) => row.original))

    // Add the worksheet to the workbook
    utils.book_append_sheet(workbook, worksheet, 'Data')

    // Convert the workbook to an Excel file
    writeFile(workbook, fileName)
  }

  const openMail = () => {
    const emails = Object.keys(rowSelection)
      .map((id) => contacts.find((c) => c.id === id))
      .filter((c) => Boolean(c?.email_1))
      .map((c) => c.email_1)
    if (emails.length > 0) {
      const to = emails.join(',')
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${to}`,
        '_blank',
        'noreferrer'
      )
    } else {
      toast.info('Aucun contact selectionné')
    }
  }

  const handleDeleteRow = (row) => {
    dispatch(deleteManyContacts({ ids: [row.id] }))
  }

  const deleteContacts = () => {
    dispatch(deleteManyContacts({ ids: Object.keys(rowSelection) }))
    setRowSelection({})
  }

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    const oldRow = row.original
    const newRow = values
    console.log(oldRow, newRow)
    for (let key of Object.keys(newRow)) {
      if (oldRow[key] == newRow[key] || key === 'fullname') continue
      if (!Boolean(oldRow[key]) && !Boolean(newRow[key])) continue
      const { id } = oldRow
      try {
        let value = newRow[key]
        if (key.startsWith('email')) {
          let emails = Object.keys(oldRow)
            .filter((key) => key.startsWith('email'))
            .map((key) => oldRow[key])
          value = [...new Set([...emails, value])].filter((v) => Boolean(v))
          key = 'emails'
        } else if (key.startsWith('phone')) {
          const uniquePhones = {}
          let phones = Object.keys(oldRow)
            .filter((key) => key.startsWith('phone'))
            .map((key) => ({ phone: oldRow[key] }))
          value = [...new Set([...phones, { phone: value }])]
            .filter((obj) => {
              if (!uniquePhones[obj.phone]) {
                uniquePhones[obj.phone] = true
                return true
              }
              return false
            })
            .filter((v) => Boolean(v.phone))
          key = 'phones'
        }
        await dispatch(updateContact({ key, value, id })).unwrap()
      } catch (error) {
        toast.error('Error updating ' + key)
      }
    }
    exitEditingMode()
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
      <div className="[&>*]:mr-4 my-4 px-4">
        {Object.values(rowSelection).length > 0 && (
          <button
            className="bg-red-600 px-4 py-2 text-white rounded-md ml-3"
            onClick={deleteContacts}
          >
            <div className="flex items-center justify-center">
              <FontAwesomeIcon icon={faTrash} color="white" className="mr-2" />
              Delete{' '}
              {Object.values(rowSelection).length > 0 &&
                `(${Object.values(rowSelection).length})`}
              {deletingContacts && (
                <span className="ml-2">
                  <CircularProgress style={{ color: 'white' }} size={20} />
                </span>
              )}
            </div>
          </button>
        )}
        <button
          className="bg-blue-600 px-4 py-2 text-white rounded-md"
          onClick={openMail}
        >
          <FontAwesomeIcon icon={faEnvelope} color="white" className="mr-2" />
          Send Mail{' '}
          {Object.values(rowSelection).length > 0 &&
            `(${Object.values(rowSelection).length})`}
        </button>
      </div>
      <MaterialReactTable
        columns={columns}
        data={displayableContacts || []}
        enableRowSelection
        enableColumnOrdering={false}
        enablePagination={false}
        enableStickyHeader={true}
        getRowId={(row) => row.id}
        enableFilters={true}
        enableGrouping={true}
        enableEditing={true}
        onEditingRowSave={handleSaveRowEdits}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => table.setEditingRow(row)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        enableGlobalFilter={false}
        enableColumnFilterModes={true}
        columnFilterModeOptions={[
          'contains',
          'equals',
          'startsWith',
          'endsWith',
          'empty',
          'notEmpty',
          'fuzzy',
        ]}
        muiTableBodyCellProps={({ cell, row }) => ({
          onDoubleClick: (event) => {
            console.info()
            if (cell.column.id !== 'fullname') return
            setSelectedId(row.id)
            openContact()
          },
        })}
        state={{
          isLoading: loadingContact || deletingContacts,
          rowSelection,
        }}
        onRowSelectionChange={setRowSelection}
        positionToolbarAlertBanner="bottom"
        renderTopToolbarCustomActions={({ table }) => (
          <Box
            sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }}
          >
            <Tooltip title="Export all rows (csv)">
              <IconButton onClick={handleMenuClick}>
                <CloudDownload />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorElMenu}
              open={openDownloadMenu}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <MenuItem
                onClick={() => {
                  handleExportRows(table.getPrePaginationRowModel().rows)
                  handleMenuClose()
                }}
              >
                Export all rows (csv)
              </MenuItem>
              <MenuItem
                onClick={() => {
                  exportToExcel(table.getPrePaginationRowModel().rows)
                  handleMenuClose()
                }}
              >
                Export all rows (excel)
              </MenuItem>
              <MenuItem
                disabled={
                  !table.getIsSomeRowsSelected() &&
                  !table.getIsAllRowsSelected()
                }
                //only export selected rows
                onClick={() => {
                  handleExportRows(table.getSelectedRowModel().rows)
                  handleMenuClose()
                }}
              >
                Export Selected Rows (csv)
              </MenuItem>
              <MenuItem
                disabled={
                  !table.getIsSomeRowsSelected() &&
                  !table.getIsAllRowsSelected()
                }
                //only export selected rows
                onClick={() => {
                  exportToExcel(table.getSelectedRowModel().rows)
                  handleMenuClose()
                }}
              >
                Export Selected Rows (excel)
              </MenuItem>
            </Menu>
          </Box>
        )}
      />
      {drawerContact && (
        <Drawer
          opened={openedContact}
          onClose={closeContact}
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
