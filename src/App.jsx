import { useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import {Contacts as OldMain} from './pages/Contacts'
import ContactDetails from './pages/Contacts/ContactDetails'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AuthCheck from './components/AuthCheck'
import Main from './pages/Main'
import Contacts from './pages/Main/pages/Contacts'
import Users from './pages/Main/pages/Users'

const App = () => {
  const { authenticated } = useSelector((state) => state.user)
  const contacts = useSelector((state) => state.contacts.data)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthCheck />}>
            <Route
              path="/"
              element={authenticated ? <Main /> : <Navigate to="/login" />}
            >
              <Route path="/" element={<Contacts />} />
              <Route path="/users" element={<Users />} />
            </Route>
            <Route
              path="/old"
              element={authenticated ? <OldMain /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={authenticated ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/details"
              element={
                authenticated ? <Navigate to="/details" /> : <ContactDetails />
              }
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
