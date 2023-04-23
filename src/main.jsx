import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ThemeProvider } from '@material-tailwind/react'
import { Provider } from 'react-redux'
import { store } from './app/store'
import './index.css'
import { ToastContainer } from 'react-toastify'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <App />
        <ToastContainer />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
)
