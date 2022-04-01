import { useRouter } from 'next/router'
import React, { createContext, useEffect, useState } from 'react'

import { postsEntryPoint, publicEntrypoint, usersEntryPoint } from './AxiosUtils'
import { memorizeCredentials, retrieveCredentials, unvalidateCredentials } from './StorageUtils'

const AppContext = createContext({})

export const AppContextProvider = (props) => {
  const [posts, setPosts] = useState([])
  const [userCredentials, setUserCredentials] = useState({ token: null, username: '' })
  const [showAlertBox, setShowAlertBox] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const savedCreds = retrieveCredentials()
    if (savedCreds !== null) {
      setUserCredentials(savedCreds)
    }
    publicEntrypoint.get('/posts').then(res => setPosts(res.data))
  }, [])

  const sessionExpiredRedirect = (err) => {
    if (err instanceof Error && err.message.includes('401')) {
      setUserCredentials({ token: null, username: '' })
      localStorage.removeItem('blogibloga-credentials')
      router.push({ pathname: '/login', query: { error: 'sessionExpired' } })
    }
  }

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
        memorizeCredentials(res.data)
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
    unvalidateCredentials()
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
        sessionExpiredRedirect(err)
      })
  }

  const getUserPosts = () => {
    return postsEntryPoint.get(`/all/${userCredentials.username}`, {
      headers: { 'authentication': userCredentials.token }
    })
      .then(res => res.data)
      .catch(err => sessionExpiredRedirect(err))
  }

  return (
    <AppContext.Provider
      {...props}
      value={{
        posts, isUserLogged, username, showAlertBox, showAlert, getUserPosts, addPost,
        getAuthentication, signup, login, logout
      }}
    />
  )
}

export default AppContext
