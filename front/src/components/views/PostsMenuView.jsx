import React from 'react'
import PropTypes from 'prop-types'
import Post from '../molecules/Post'

const PostsMenuView = ({ posts }) => {
  return (
    <div className="w-full max-h-[88.7%] mt-20 px-8 pt-12 flex flex-col items-center overflow-y-scroll">
      {posts.map((post, index) => (<Post key={index} post={post} isAdminInterface/>))}
      {posts.map((post, index) => (<Post key={index} post={post} isAdminInterface/>))}
      {posts.map((post, index) => (<Post key={index} post={post} isAdminInterface/>))}
    </div>
  )
}

PostsMenuView.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
}

export default PostsMenuView

