import { Avatar } from '@mantine/core'

const UserRow = ({ user, selected, onChecked }) => {
  return (
    <tr className="border-b">
      <td className="py-3 flex relative">
        <Avatar>{user.fullname[0]}</Avatar>
        <div className="ml-2">
          <h5 className="font-medium capitalize">{user?.fullname}</h5>
          <p className="text-sm text-description">{user?.email}</p>
        </div>
      </td>
      <td className="py-3 text-description">{user?.role}</td>
    </tr>
  )
}

export default UserRow
