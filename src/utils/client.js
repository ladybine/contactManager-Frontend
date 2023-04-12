import axios from 'axios'

const client = () => {
  const instance = axios.create({
    baseURL: `http://${window.location.hostname}:4000`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  return instance
}
/* import.meta.env.VITE_API_URL, */
export default client
