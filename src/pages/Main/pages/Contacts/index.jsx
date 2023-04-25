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



const Contacts = () => {
  return (
    <div>
      <div className="flex items-center">
        <SearchInput />
        <div className="ml-6">
          <ImportFile />
          <Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
            <FontAwesomeIcon icon={faBrush} color="white" className="mr-2" />
            Clean
          </Button>
        </div>
      </div>
      <div className="py-4">
        <ContactList />
      </div>
    </div>
  )
}

export default Contacts
