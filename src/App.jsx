import { useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Contacts from './pages/Contacts'
import ContactDetails from './pages/Contacts/ContactDetails'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AuthCheck from './components/AuthCheck'

const App = () => {
  const { authenticated } = useSelector((state) => state.user)
  const contacts = useSelector((state) => state.contacts.data)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AuthCheck />}>
            <Route
              path="/"
              element={authenticated ? <Contacts /> : <Navigate to="/login" />}
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
