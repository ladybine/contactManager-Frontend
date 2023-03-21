import axios from 'axios'

const client = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  return instance
}

export default client
