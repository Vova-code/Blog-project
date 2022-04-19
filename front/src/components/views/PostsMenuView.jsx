import React, { useContext, useEffect } from 'react'

import AppContext from '../../utils/AppContext'
import AlertBox from '../molecules/AlertBox'
import Post from '../molecules/Post'

const PostsMenuView = ({ usersPosts }) => {

  useEffect( () => {
  }, [usersPosts])

  return (
    <div className="w-full max-h-[88.7%] mt-20 px-8 pt-12 flex flex-col items-center overflow-y-scroll">
      {usersPosts && usersPosts.map((post, index) => (<Post key={index} post={post} isAdminInterface/>))}
      <div className="absolute top-50 right-30">
        <AlertBox type="info" message="Votre post à été mis a jour !"/>
      </div>
    </div>
  )
}

export default PostsMenuView

