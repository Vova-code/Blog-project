import React from 'react'

import AlertBox from '../molecules/AlertBox'
import NewPostForm from '../molecules/Forms/NewPostForm'

const PostsMenuView = () => {

  return (
    <div className="w-full max-h-[88.7%] mt-20 px-8 pt-12 flex flex-col items-center overflow-y-scroll">
      <NewPostForm/>
      <div className="absolute bottom-[20%] right-[30%]">
        <AlertBox type="succès" message="Votre post à été publié !"/>
      </div>
    </div>
  )
}

export default PostsMenuView

