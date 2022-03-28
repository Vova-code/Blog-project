import React, { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { publicEntrypoint, usersEntrPoint } from './AxiosUtils'

const AppContext = createContext({})

export const AppContextProvider = (props) => {
  const [posts, setPosts] = useState([])
  const [userCredentials, setUserCredentials] = useState({ token: '', username: '' })
  const router = useRouter()

  useEffect(() => {
    const savedCreds = localStorage.getItem('blogibloga-token')
    if (savedCreds !== null) {
      setUserCredentials(savedCreds)
    }
    publicEntrypoint.get('/posts').then(res => setPosts(res.data))
  }, [userCredentials])

  const login = (credentials) => {
    usersEntrPoint.post('/sign-in', credentials)
      .then(res => {
        setUserCredentials(res.data)
        localStorage.setItem('blogibloga-credentials', res.data)
        router.push('/')
      })
  }

  const logout = () => {
    setUserCredentials({ token: null, username: '' })
    localStorage.removeItem('blogibloga-token')
    router.push('/login')
  }

  const isUserLogged = userCredentials.token !== ''
  const username = userCredentials.username

  return (
    <AppContext.Provider
      {...props}
      value={{ posts, isUserLogged, username, login, logout }}
    />
  )
}

export default AppContext
