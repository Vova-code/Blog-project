import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { HiOutlineTrash, HiOutlinePencil } from 'react-icons/hi'
import AppContext from '../../utils/AppContext'

const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }

const Post = ({ post, isAdminInterface }) => {
  const { openPopin } = useContext(AppContext)

  return (
    <div className="relative w-4/5 mb-20 p-12 border-black border bg-white/75 rounded-2xl
               hover:shadow-2xl hover:cursor-pointer transition-all durations-600">
      {isAdminInterface &&
      <div className="absolute flex top-4 right-4">
        <HiOutlinePencil className="mr-4 text-xl hover:text-blue-600"/>
        <HiOutlineTrash className="mr-4 text-xl hover:text-red-600"
                        onClick={() => openPopin('Supprimer définitivement', 'Voulez-vous supprimer ce post ?', post.post_id)}/>
      </div>}
      <h2 className="mb-4 font-semibold text-2xl">{post.title}</h2>
      <span>{post.content}</span>
      {!isAdminInterface &&
      <div className="absolute bottom-4 right-4 flex italic text-xs">
        <p>publié le {new Date(Number(post.created_at)).toLocaleString('fr-FR', options)} par</p>
        <span
          className="ml-1 font-bold hover:text-red-600 cursor-pointer transition-all duration-300">{post.author}</span>
      </div>}
      {isAdminInterface &&
      <div className="absolute bottom-4 right-4 flex italic text-xs">
        <p>publié le {new Date(Number(post.created_at)).toLocaleString('fr-FR', options)}</p>
      </div>}
    </div>
  )
}

Post.propTypes = {
  post: PropTypes.object,
  isAdminInterface: PropTypes.bool
}

export default Post

