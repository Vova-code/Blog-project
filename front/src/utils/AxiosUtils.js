import axios from 'axios'

export const publicEntrypoint = axios.create({
  baseURL: 'http://localhost:3001/api'
})

export const usersEntryPoint = axios.create({
  baseURL: 'http://localhost:3001'
})

export const postsEntryPoint = axios.create({
  baseURL: 'http://localhost:3001/posts'
})
