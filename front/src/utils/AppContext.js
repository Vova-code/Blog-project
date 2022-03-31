import React, { createContext, useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { publicEntrypoint, usersEntryPoint } from './AxiosUtils'

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
  }, [userCredentials])

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

  return (
    <AppContext.Provider
      {...props}
      value={{ posts, isUserLogged, username, getAuthentication, login, logout }}
    />
  )
}

export default AppContext
