import React, { useContext, useEffect, useState } from 'react'

import AppContext from '../../utils/AppContext'
import Post from '../molecules/Post'

const PostsMenuView = () => {
  const { getUserPosts } = useContext(AppContext)
  const [userPosts, setUserPosts] = useState([])


  useEffect(async () => {
    const posts = await getUserPosts().then(res => res)
    console.log('Posts: ', posts)
    setUserPosts(posts)
  }, [])


  return (
    <div className="w-full max-h-[88.7%] mt-20 px-8 pt-12 flex flex-col items-center overflow-y-scroll">
      {userPosts.map((post, index) => (<Post key={index} post={post} isAdminInterface/>))}
    </div>
  )
}

export default PostsMenuView

