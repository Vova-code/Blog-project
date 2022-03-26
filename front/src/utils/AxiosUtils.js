import axios from 'axios'

export const publicEntrypoint = axios.create({
  baseURL: 'http://localhost:3001/api'
})

export const usersEntrPoint = axios.create({
  baseURL: 'http://localhost:3001'
})
