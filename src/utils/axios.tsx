import axios from 'axios'

const AxiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

AxiosClient.interceptors.request.use((config) => {

  if (config && process.env.NEXT_PUBLIC_X_API_KEY) {
    config.headers.set('x-api-key', `${process.env.NEXT_PUBLIC_X_API_KEY}`)
  }

  return config

}, (error) => {

  return Promise.reject(error)

})

export default AxiosClient