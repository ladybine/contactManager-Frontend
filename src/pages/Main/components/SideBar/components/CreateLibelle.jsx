import {
  CircularProgress,
  TextField,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import { useDisclosure } from '@mantine/hooks'
import { useDispatch } from 'react-redux'
import { createLibelle } from '../../../../../features/user/actions'
import { useState } from 'react'

const CreateLibelle = () => {
    const dispatch = useDispatch()

    const [name, setName] = useState('')

    const [isOpenCreateLibeller, { open: openLibeller, close: closeLibeller }] =
    useDisclosure(false)

    const handleSubmitLibele = async () => {
        dispatch(createLibelle({ name })).finally(() => closeLibeller())
    }

  return (
    <>
      <button
        onClick={openLibeller}
        className="w-full flex items-center justify-center bg-white border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-sm font-medium text-gray-700 py-2 px-4 rounded-lg"
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
        Libellés
      </button>
      <Dialog open={isOpenCreateLibeller} onClose={closeLibeller}>
        <DialogTitle>Creer un libellé</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label=""
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nouveau libellé"
            required
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <button
            className="bg-blue-500 text-white font-bold px-5 py-1"
            onClick={closeLibeller}
          >
            Close
          </button>
          <button
            className="bg-blue-500 text-white font-bold px-5 py-1"
            onClick={handleSubmitLibele}
          >
            Validate
          </button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CreateLibelle
