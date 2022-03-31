import { useRouter } from 'next/router'
import React, { createContext, useEffect, useState } from 'react'

import { postsEntryPoint, publicEntrypoint, usersEntryPoint } from './AxiosUtils'

const AppContext = createContext({})

export const AppContextProvider = (props) => {
  const [posts, setPosts] = useState([])
  const [userCredentials, setUserCredentials] = useState({ token: null, username: '' })
  const router = useRouter()

  useEffect(() => {
    const savedCreds = localStorage.getItem('blogibloga-credentials')
    if (savedCreds !== null) {
      setUserCredentials(JSON.parse(savedCreds))
    }
    publicEntrypoint.get('/posts').then(res => setPosts(res.data))
  }, [posts])

  const login = (credentials) => {
    usersEntryPoint.post('/sign-in', credentials)
      .then(res => {
        setUserCredentials(res.data)
        localStorage.setItem('blogibloga-credentials', JSON.stringify(res.data))
        router.push('/')
      })
  }

  const logout = () => {
    setUserCredentials({ token: null, username: '' })
    localStorage.removeItem('blogibloga-credentials')
    router.push('/login')
  }

  const getAuthentication = () => {
    return userCredentials.token !== null ? userCredentials.token : null
  }

  const isUserLogged = userCredentials.token !== null

  const username = userCredentials.username

  //Post section
  const addPost = values => {
    postsEntryPoint.post(`/add/${userCredentials.username}`, values, {
      headers: { 'authentication': userCredentials.token }
    })
  }

  return (
    <AppContext.Provider
      {...props}
      value={{ posts, isUserLogged, username, addPost,
        getAuthentication, login, logout }}
    />
  )
}

export default AppContext
