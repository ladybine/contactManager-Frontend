import { Select, Option } from '@material-tailwind/react'
import {
  faAdd,
  faBrush,
  faContactBook,
  faEnvelope,
  faFileExport,
  faFileImport,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ContactList from './ContactList'
import { useDispatch, useSelector } from 'react-redux'
import {
  uploadFile,
  clean,
  deleteManyContacts,
} from '../../features/contacts/action'
import { searchContact } from '../../features/contacts/contactsSlice'
import { useEffect, useRef, useState } from 'react'
import Search from './Search'
import { Drawer, Menu, Button, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import AddContact from './AddContact'
import { toast } from 'react-toastify'
import {
  CircularProgress,
  TextField,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import Flash from '../../assets/flash.png'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { getCurrentUser } from '../../features/user/actions'
import { Logout, PersonAdd } from '@mui/icons-material'
import { insertUser } from '../../features/user/actions'
import { logout } from '../../features/user/userSlice'

const Contacts = () => {
  const {
    data: contacts,
    selected,
    searchText,
    deletingContacts,
  } = useSelector((state) => state.contacts)
  const [isOpenCreate, { open: openCreate, close: closeCreate }] =
    useDisclosure(false)
  const [isOpenCreateLibeller, { open: openLibeller, close: closeLibeller }] =
    useDisclosure(false)
  const { email } = useSelector((state) => state.user)
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState({ field: '', operator: '', value: '' })
  const [opened, { open, close }] = useDisclosure(false)
  const inputFile = useRef()
  const inputExport = useRef()
  const dispatch = useDispatch()

  const [newUserEmail, setNewUserEmail] = useState('')
  const [newUserPassword, setNewUserPassword] = useState('')
  const [newLibeller, setNewlibeller] = useState('')

  const submitFile = (e) => {
    if (!e.target.files) return
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    dispatch(uploadFile(file)).finally(() => {
      setUploading(false)
      inputFile.current.value = ''
    })
  }

  const handleclean = () => {
    setLoading(true)
    dispatch(clean()).finally(() => {
      setLoading(false)
      toast.info('Nettoyage terminé')
    })
  }

  const inline = () => {
    dispatch(getCurrentUser()).finally()
  }

  const exportFile = (e) => {
    if (!e.target.files) return
    const file = e.target.files[0]
    if (!file) return
    dispatch(exportFile(file)).finally(() => {
      if (inputFile.current) {
        inputFile.current.value = ''
      }
    })
  }

  const handleFilterModelChange = ({ field, operator, value }) => {
    dispatch(searchContact(''))
    setFilter({
      field: field || '',
      operator: operator || '',
      value: value || '',
    })
  }

  const openMail = () => {
    const emails = selected
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

  const deleteContacts = () => {
    dispatch(deleteManyContacts({ ids: selected }))
  }

  const handleSubmitUser = async () => {
    if (!newUserEmail && !newUserPassword) return
    dispatch(
      insertUser({ email: newUserEmail, password: newUserPassword })
    ).finally(() => closeCreate())
  }
  const handleSubmitLibelé = async () => {}

  useEffect(() => {
    setFilter({
      field: 'fullname',
      operator: 'search',
      value: searchText,
    })
  }, [searchText])

  return (
    <div className="p-1">
      <div className="flex items-center justify-between">
        <img className="w-10" src={Flash} />
        <div className="flex">
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <div className="flex items-center cursor-pointer">
                <p className="mr-3">{email}</p>
                <AccountCircle className="cursor-pointer" />
              </div>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item icon={<Logout />} onClick={() => dispatch(logout())}>
                Log out
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <button
            onClick={openCreate}
            className="bg-blue-500 px-2 py-2 text-white rounded-md ml-3"
          >
            <PersonAdd />
          </button>
          <Dialog open={isOpenCreate} onClose={closeCreate}>
            <DialogTitle>Sign up</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email"
                type="email"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
                required
                fullWidth
                variant="standard"
              />

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
        </div>
      </div>
      <hr className="mb-4" />

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          <FontAwesomeIcon icon={faContactBook} color="blue" className="mr-4" />
          Contacts {contacts && `(${contacts?.length})`}
        </h2>
        <div className="[&>*]:mx-2">
          <button
            className="bg-blue-600 px-4 py-2 text-white rounded-md"
            onClick={open}
          >
            <FontAwesomeIcon icon={faAdd} color="white" className="mr-2" />
            Add a contact
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
            {/* {drow contenue} */}
            <AddContact />
          </Drawer>
          <label
            htmlFor="file"
            className="bg-blue-600 cursor-pointer px-6 py-[0.70rem] text-white rounded-md"
          >
            <FontAwesomeIcon
              icon={faFileImport}
              color="white"
              className="mr-2"
            />
            {uploading ? 'Loading...' : 'Import a file'}
          </label>
          <input
            className="hidden"
            type="file"
            name="file"
            id="file"
            onChange={submitFile}
            ref={inputFile}
          />
          {/* export */}
          <label className="bg-blue-600 cursor-pointer px-6 py-[0.70rem] text-white rounded-md">
            <FontAwesomeIcon
              icon={faFileExport}
              color="white"
              className="mr-2"
            />
            <a
              href={`http://${window.location.hostname}:4000/contacts/excel?field=${filter.field}&operator=${filter.operator}&value=${filter.value}`}
              target="_blank"
            >
              Export
            </a>
            {/* {uploading ? 'Chargement...' : 'Importer un fichier'} */}
          </label>
          {/* <input
            className="hidden"
            type="text"
            name="file"
            id="file"
            onChange={exportFile}
            ref={inputExport}
          /> */}
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between">
        <div className="relative w-[30%]">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>

          <Search />
        </div>

        <div className="flex">
          <button
            onClick={openLibeller}
            className="bg-blue-500 px-2 py-2 text-white rounded-md mr-3"
          >
            +Libellé
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
                value={newLibeller}
                onChange={(e) => setNewlibeller(e.target.value)}
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
                onClick={handleSubmitLibelé}
              >
                Validate
              </button>
            </DialogActions>
          </Dialog>
          <button
            className="bg-blue-600 px-4 py-2 text-white rounded-md mr-4"
            onClick={handleclean}
          >
            <FontAwesomeIcon icon={faBrush} color="white" className="mr-2" />
            Clean
            {loading && (
              <span className="ml-2">
                <CircularProgress style={{ color: 'white' }} size={20} />
              </span>
            )}
          </button>
          <div className="">
            {/*   //emails */}

            <button
              className="bg-blue-600 px-4 py-2 text-white rounded-md"
              onClick={openMail}
            >
              <FontAwesomeIcon
                icon={faEnvelope}
                color="white"
                className="mr-2"
              />
              Send Mail{' '}
              {Array.isArray(selected) &&
                selected.length > 0 &&
                `(${selected.length})`}
            </button>

            {Array.isArray(selected) && selected.length > 0 && (
              <button
                className="bg-red-600 px-4 py-2 text-white rounded-md ml-3"
                onClick={deleteContacts}
              >
                <div className="flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faTrash}
                    color="white"
                    className="mr-2"
                  />
                  Delete{' '}
                  {Array.isArray(selected) &&
                    selected.length > 0 &&
                    `(${selected.length})`}
                  {deletingContacts && (
                    <span className="ml-2">
                      <CircularProgress style={{ color: 'white' }} size={20} />
                    </span>
                  )}
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="my-3">
        <ContactList onFilterModelChange={handleFilterModelChange} />
      </div>
    </div>
  )
}

export default Contacts
