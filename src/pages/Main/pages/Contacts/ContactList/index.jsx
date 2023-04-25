import MaterialReactTable from 'material-react-table'
import { ExportToCsv } from 'export-to-csv' 
import { Box, Button } from '@mui/material'
import { FileDownload } from '@mui/icons-material'
// import {
//   DataGrid,
//   GridToolbarContainer,
//   GridToolbarFilterButton,
//   GridToolbarDensitySelector,
//   GridToolbarColumnsButton,
// } from 'mat'

import { columns } from './utils/columns'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAllContacts } from '../../../../../features/contacts/action'

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
  const { data: contacts, searchText } = useSelector((state) => state.contacts)

  useEffect(() => {
    dispatch(getAllContacts())
  }, [])

  const handleExportRows = (rows) => {
    csvExporter.generateCsv(rows.map((row) => row.original))
  }

  const handleExportData = () => {
    csvExporter.generateCsv(data)
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
        positionToolbarAlertBanner="bottom"
        renderTopToolbarCustomActions={({ table }) => (
          <Box
            sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }}
          >
            <Button
              disabled={table.getPrePaginationRowModel().rows.length === 0}
              //export all rows, including from the next page, (still respects filtering and sorting)
              onClick={() =>
                handleExportRows(table.getPrePaginationRowModel().rows)
              }
              startIcon={<FileDownload />}
              variant="contained"
            >
              Export All Rows
            </Button>
            <Button
              disabled={
                !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
              }
              //only export selected rows
              onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
              startIcon={<FileDownload />}
              variant="contained"
            >
              Export Selected Rows
            </Button>
          </Box>
        )}
      />
    </div>
  )
}

export default ContactList
