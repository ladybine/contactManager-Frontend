import { useDisclosure } from '@mantine/hooks'
import { Button } from '@material-tailwind/react'
import { Add } from '@mui/icons-material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { insertUser } from '../../../../../features/user/actions'
import {
  CircularProgress,
  TextField,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
} from '@mui/material'

const CreateUserButton = () => {
  const dispatch = useDispatch()

  const [isOpenCreate, { open: openCreate, close: closeCreate }] =
    useDisclosure(false)

  const [name, setName] = useState('')
  const [role, setRole] = useState('admin')
  const [newUserEmail, setNewUserEmail] = useState('')
  const [newUserPassword, setNewUserPassword] = useState('')

  const handleSubmitUser = async () => {
    if (!newUserEmail && !newUserPassword) return
    dispatch(
      insertUser({
        email: newUserEmail,
        password: newUserPassword,
        fullname: name,
        role,
      })
    ).finally(() => closeCreate())
  }

  return (
    <>
      <Button className="mt-5" onClick={openCreate}>
        <Add /> Ajouter un utilisateur
      </Button>
      <Dialog open={isOpenCreate} onClose={closeCreate}>
        <DialogTitle>Sign up</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="fullname"
            label="Fullname"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email"
            type='email'
            value={newUserEmail}
            onChange={(e) => setNewUserEmail(e.target.value)}
            required
            fullWidth
            variant="standard"
          />

          <div className="flex my-4">
            <Select
              label="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              fullWidth
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="editor">Editor</MenuItem>
              <MenuItem value="user">Simple User</MenuItem>
            </Select>
          </div>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="password"
            type="password"
            value={newUserPassword}
            onChange={(e) => setNewUserPassword(e.target.value)}
            required
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <button
            className="bg-blue-500 text-white font-bold px-5 py-2"
            onClick={closeCreate}
          >
            Close
          </button>
          <button
            className="bg-blue-500 text-white font-bold px-5 py-2"
            onClick={handleSubmitUser}
          >
            Validate
          </button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CreateUserButton
