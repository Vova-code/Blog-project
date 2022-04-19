import { useRouter } from 'next/router'
import React, { createContext, useCallback, useEffect, useState } from 'react'

import { postsEntryPoint, publicEntrypoint, usersEntryPoint } from './AxiosUtils'
import { memorizeCredentials, retrieveCredentials, unvalidateCredentials } from './StorageUtils'

const AppContext = createContext({})

export const AppContextProvider = (props) => {
  const [posts, setPosts] = useState([])
  const [userCredentials, setUserCredentials] = useState({ token: null, username: '' })
  const [usersPosts, setUsersPosts] = useState([])

  const [showAlertBox, setShowAlertBox] = useState(false)
  const [popin, setPopin] = useState({ title: '', content: '', data: null, isOpen: false, type: '' })

  const router = useRouter()

  useEffect(() => {
    const savedCreds = retrieveCredentials()
    if (savedCreds !== null) {
      setUserCredentials(savedCreds)
    }
    publicEntrypoint.get('/posts').then(res => {
      setPosts(res.data)
    })
  }, [])

  const sessionExpiredRedirect = (err) => {
    if (err instanceof Error && err.message.includes('307')) {
      setUserCredentials({ token: null, username: '' })
      localStorage.removeItem('blogibloga-credentials')
      router.push({ pathname: '/login', query: { error: 'sessionExpired' } })
    }
  }

  const showAlert = () => {
    setShowAlertBox(true)
    setTimeout(() => {
      setShowAlertBox(false)
    }, 2000)
  }

  const openPopin = (title, content, data, type) => {
    setPopin({ title: title, content: content, data: data, isOpen: true, type: type })
  }

  const closePopin = () => {
    setPopin({ title: '', content: '', data: null, isOpen: false, type: '' })
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
    }).catch(err => sessionExpiredRedirect(err))
  }

  const deletePost = () => {
    postsEntryPoint.post('/delete', { postId: popin.data }, {
      headers: { 'authentication': userCredentials.token }
    }).then(() => {
      getUserPosts()
      closePopin()
    })
      .catch(err => sessionExpiredRedirect(err))
  }

  const getUserPosts = useCallback(() => {
      postsEntryPoint.get(`/all/${userCredentials.username}`, {
        headers: { 'authentication': userCredentials.token }
      })
        .then(res => setUsersPosts(res.data))
        .catch(err => sessionExpiredRedirect(err))
    }, [userCredentials])

  const updatePost = (updatedValues) => {
    postsEntryPoint.post('/update', { postId: popin.data.post_id, updatedValues },
      {
        headers: { 'authentication': userCredentials.token }
      })
      .then(() => {
        getUserPosts()
      })
      .catch(err => console.log(err))
  }

  return (
    <AppContext.Provider
      {...props}
      value={{
        posts, isUserLogged, username, usersPosts, showAlertBox, popin,
        showAlert, openPopin, closePopin, getUserPosts, addPost, deletePost, updatePost,
        getAuthentication, signup, login, logout
      }}
    />
  )
}

export default AppContext
