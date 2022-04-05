import React, { useContext, useEffect, useState } from 'react'

import AppContext from '../../utils/AppContext'
import Post from '../molecules/Post'

const PostsMenuView = () => {
  const { usersPosts, getUserPosts } = useContext(AppContext)


  useEffect(async () => {
    getUserPosts()
  }, [])

  return (
    <div className="w-full max-h-[88.7%] mt-20 px-8 pt-12 flex flex-col items-center overflow-y-scroll">
      {usersPosts && usersPosts.map((post, index) => (<Post key={index} post={post} isAdminInterface/>))}
    </div>
  )
}

export default PostsMenuView

