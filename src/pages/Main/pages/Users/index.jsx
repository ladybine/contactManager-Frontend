import { useState } from 'react'
import { useSelector } from 'react-redux'
import UserRow from './components/UserRow'
import { Button } from '@material-tailwind/react'
import { Add } from '@mui/icons-material'
import CreateUserButton from './components/CreateUserButton'

const Users = () => {
  const { users } = useSelector((state) => state.user)

  const [selectedUsers, setSelectedUsers] = useState([])

  const toggleSelection = (user) => {
    if (selectedUsers.find((x) => x.email === user.email) !== undefined) {
      setSelectedUsers(selectedUsers.filter((x) => x.email !== user.email))
    } else {
      setSelectedUsers([...selectedUsers, user])
    }
  }

  return (
    <>
      <table className="w-full">
        <thead>
          <tr className="[&>*]:font-normal [&>*]:text-description border-b [&>*]:text-left">
            <th className="w-[50%]">Nom</th>
            <th className="w-[25%]">Role</th>
            <th className="w-[25%] lg-max:hidden">Ajouté le</th>
          </tr>
        </thead>
        {users.length === 0 && (
          <p className="my-4 w-full text-description">Aucune membre</p>
        )}
        <tbody>
          {users.map((user, index) => (
            <UserRow
              key={index}
              user={user}
              selected={
                selectedUsers.find((x) => x.email === user.email) !== undefined
              }
              onChecked={(u) => toggleSelection(u)}
            />
          ))}
        </tbody>
      </table>
      <CreateUserButton />
    </>
  )
}

export default Users
