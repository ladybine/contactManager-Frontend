import axios from 'axios'

const client = () => {
  const instance = axios.create({
    baseURL: `http://${window.location.hostname}:3000`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  return instance
}

export default client
