import React, { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { publicEntrypoint, usersEntrPoint } from './AxiosUtils'

const AppContext = createContext({})

export const AppContextProvider = (props) => {
  const [posts, setPosts] = useState([])
  const [userToken, setUserToken] = useState(null)
  const router = useRouter()

  useEffect(() => {
    publicEntrypoint.get('/posts').then(res => setPosts(res.data))
  }, [])

  const login = (credentials) => {
    usersEntrPoint.post('/sign-in', credentials)
      .then(res => {
        setUserToken(res.data.token)
        router.push('/')
      })
  }

  const isUserLogged = userToken !== null


  return (
    <AppContext.Provider
      {...props}
      value={{ posts, isUserLogged, login }}
    />
  )
}

export default AppContext
