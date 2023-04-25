import { Menu } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'
import Flash from '../../../assets/flash.png'
import { logout } from '../../../features/user/userSlice'
import { AccountCircle, Logout } from '@mui/icons-material'

const MainHeader = () => {
  const dispatch = useDispatch()
  const { data: user } = useSelector((state) => state.user)

  return (
    <div>
      <div className="flex items-center justify-between px-10 mb-1">
        <img className="w-10" src={Flash} />
        <div className="flex">
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <div className="flex items-center cursor-pointer">
                <p className="mr-3">
                  {user.email} ({user.role})
                </p>
                <AccountCircle className="cursor-pointer" />
              </div>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item icon={<Logout />} onClick={() => dispatch(logout())}>
                Log out
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </div>
      <hr className="mb-4" />
    </div>
  )
}

export default MainHeader
