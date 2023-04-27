import { useDispatch, useSelector } from 'react-redux'
import CreateContactButton from './components/CreateContactButton'
import NavItem from './components/NavItem'
import { Add, Bookmark, Contacts, People } from '@mui/icons-material'
import { useEffect } from 'react'
import { getAllLibelles, getAllUsers } from '../../../../features/user/actions'
import { Button } from '@material-tailwind/react'
import CreateLibelle from './components/CreateLibelle'
import { Link } from 'react-router-dom'

const SideBar = () => {
  const dispatch = useDispatch()

  const { data: contacts } = useSelector((state) => state.contacts)
  const { users, libelles } = useSelector((state) => state.user)
  const { data: user } = useSelector((state) => state.user)

  useEffect(() => {
    if (user.role === 'admin') {
      dispatch(getAllUsers())
    }
    dispatch(getAllLibelles())
  }, [])

  return (
    <div className="px-2 py-10 w-full flex flex-col items-center">
      {user.role != 'user' && <CreateContactButton />}
      <div className="mt-8 w-[70%] [&>*]:mb-6">
        <NavItem
          to="/"
          icon={<Contacts className="w-5 h-5 mr-2" />}
          label={`Contacts    ${
            contacts != null && contacts.length != 0
              ? '(' + contacts.length + ')'
              : ''
          }`}
        />
        {user.role === 'admin' && (
          <NavItem
            to="/users"
            icon={<People className="w-5 h-5 mr-2" />}
            label={`Utilisateurs    ${
              users != null && users.length != 0 ? '(' + users.length + ')' : ''
            }`}
          />
        )}
        <div className="flex justify-center w-full">
          {user.role != 'user' && <CreateLibelle />}
        </div>
        <div className="mt-4">
          {libelles.map((libelle) => (
            <div className="mb-4" key={libelle._id}>
              <Link to={`/?libelle=${libelle._id}`}>
                <div className="p-2 bg-blue-gray-100/20 rounded-xl flex items-center">
                  <Bookmark className="mr-4" />
                  {libelle.name}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SideBar
