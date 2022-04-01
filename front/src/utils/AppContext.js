import { useRouter } from 'next/router'
import { instanceOf } from 'prop-types'
import React, { createContext, useCallback, useEffect, useState } from 'react'

import { postsEntryPoint, publicEntrypoint, usersEntryPoint } from './AxiosUtils'

const AppContext = createContext({})

export const AppContextProvider = (props) => {
  const [posts, setPosts] = useState([])
  const [userCredentials, setUserCredentials] = useState({ token: null, username: '' })
  const [showAlertBox, setShowAlertBox] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const savedCreds = localStorage.getItem('blogibloga-credentials')
    if (savedCreds !== null) {
      setUserCredentials(JSON.parse(savedCreds))
    }
    publicEntrypoint.get('/posts').then(res => setPosts(res.data))
  }, [])

  const showAlert = () => {
    setShowAlertBox(true)
    setTimeout(() => {
      setShowAlertBox(false)
    }, 3000)
  }

  const login = (credentials) => {
    usersEntryPoint.post('/sign-in', credentials)
      .then(res => {
        setUserCredentials(res.data)
        localStorage.setItem('blogibloga-credentials', JSON.stringify(res.data))
        router.push('/')
      })
  }

  const signup = (credentials) => {
    usersEntryPoint.post('/sign-up', credentials)
      .then(res => {
        setUserCredentials(res.data)
        router.push('/')
      })
      .catch(err => {
        alert(err)
        return err
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
      .catch(err => {
        if (err instanceof Error && err.message.includes('401')) {
          setUserCredentials({ token: null, username: '' })
          localStorage.removeItem('blogibloga-credentials')
          router.push({ pathname: '/login', query: { error: 'sessionExpired'} })
        }
      })
  }

  return (
    <AppContext.Provider
      {...props}
      value={{ posts, isUserLogged, username, showAlertBox, showAlert, addPost,
        getAuthentication, signup, login, logout }}
    />
  )
}

export default AppContext
