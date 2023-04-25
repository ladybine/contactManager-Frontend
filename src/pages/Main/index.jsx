import { Outlet } from 'react-router-dom'
import MainHeader from './components/MainHeader'
import SideBar from './components/SideBar'

const Main = () => {
  return (
    <div>
      <MainHeader />
      <div className="flex">
        <div className="w-[20%]">
          <SideBar />
        </div>
        <div className="w-[80%]">
            <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Main
