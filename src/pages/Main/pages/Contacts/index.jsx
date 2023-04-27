import SearchInput from './components/SearchInput'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBrush,
  faFileExport,
  faFileImport,
} from '@fortawesome/free-solid-svg-icons'
import { Button } from '@material-tailwind/react'
import ImportFile from './components/ImportFile'
import ContactList from './ContactList'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { clean } from '../../../../features/contacts/action'

const Contacts = () => {
  const dispatch = useDispatch()

  const { data: user } = useSelector((state) => state.user)

  const handleclean = () => {
    dispatch(clean()).finally(() => {
      toast.info('Nettoyage terminé')
    })
  }

  return (
    <div>
      <div className="flex items-center">
        <SearchInput />
        <div className="ml-6">
          <ImportFile />
          {user.role != 'user' && (
            <Button
              onClick={handleclean}
              variant="gradient"
              gradient={{ from: 'indigo', to: 'cyan' }}
            >
              <FontAwesomeIcon icon={faBrush} color="white" className="mr-2" />
              Clean
            </Button>
          )}
        </div>
      </div>
      <div className="py-4">
        <ContactList />
      </div>
    </div>
  )
}

export default Contacts
