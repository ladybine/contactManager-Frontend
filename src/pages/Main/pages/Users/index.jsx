import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MaterialReactTable from 'material-react-table'
import CreateUserButton from './components/CreateUserButton'
import { Avatar } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { deleteManyUsers, getAllUsers } from '../../../../features/user/actions'
import { Box, CircularProgress, IconButton, Tooltip } from '@mui/material'
import { Delete, Edit } from '@mui/icons-material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const columns = [
  {
    header: 'User',
    enableEditing: false,
    Cell: ({ row }) => (
      <div className="flex">
        <Avatar>{row.original.fullname[0]}</Avatar>
        <div className="ml-2">
          <h5 className="font-medium capitalize">{row.original.fullname}</h5>
          <p className="text-sm text-description">{row.original.email}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'fullname',
    header: 'Full Name',
    enableClickToCopy: true,
    enableEditing: true,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    enableClickToCopy: true,
    enableEditing: false,
  },
  {
    accessorKey: 'role',
    header: 'Role',
    enableEditing: true,
  },
]

const Users = () => {
  const dispatch = useDispatch()

  const [rowSelection, setRowSelection] = useState({})

  const { deletingUsers, users } = useSelector((state) => state.user)

  const deleteUsers = () => {
    if (users.length <= 1) {
      setRowSelection({})
      return
    }
    const emails = Object.keys(rowSelection).map((id) => users.find((u) => u._id === id)?.email)
    dispatch(deleteManyUsers({ emails  }))
    setRowSelection({})
  }

  const handleDeleteRow = (row) => {
    dispatch(deleteManyUsers({ emails: [row.original.email] }))
  }

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  return (
    <>
      <div className="my-4">
        {Object.values(rowSelection).length > 0 && (
          <button
            className="bg-red-600 px-4 py-2 text-white rounded-md ml-3"
            onClick={deleteUsers}
          >
            <div className="flex items-center justify-center">
              <FontAwesomeIcon icon={faTrash} color="white" className="mr-2" />
              Delete{' '}
              {Object.values(rowSelection).length > 0 &&
                `(${Object.values(rowSelection).length})`}
              {deletingUsers && (
                <span className="ml-2">
                  <CircularProgress style={{ color: 'white' }} size={20} />
                </span>
              )}
            </div>
          </button>
        )}
      </div>
      <MaterialReactTable
        columns={columns}
        data={users || []}
        enableEditing={true}
        enableRowSelection
        enableGrouping={true}
        enablePagination={false}
        enableStickyHeader={true}
        enableColumnOrdering={false}
        getRowId={(row) => row?._id}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            {
              <Tooltip arrow placement="left" title="Edit">
                <IconButton onClick={() => table.setEditingRow(row)}>
                  <Edit />
                </IconButton>
              </Tooltip>
            }
            {
              <Tooltip arrow placement="right" title="Delete">
                <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                  <Delete />
                </IconButton>
              </Tooltip>
            }
          </Box>
        )}
        state={{
          isLoading: deletingUsers,
          rowSelection,
        }}
        onRowSelectionChange={setRowSelection}
      />
      <CreateUserButton />
    </>
  )
}

export default Users
