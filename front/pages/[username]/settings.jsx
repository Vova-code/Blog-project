import React, { useCallback, useContext, useEffect, useState } from 'react'

import Button from '../../src/components/atoms/Button'
import Navbar from '../../src/components/molecules/Navbar'
import Popin from '../../src/components/molecules/Popin'
import NewPostMenuView from '../../src/components/views/NewPostMenuView'
import PostsMenuView from '../../src/components/views/PostsMenuView'

import AppContext from '../../src/utils/AppContext'


const Settings = ({ username }) => {
  const { logout, usersPosts, deletePost, getUserPosts } = useContext(AppContext)

  useEffect(() => {
    getUserPosts()
  }, [])


  const menuComponents = [
    { name: 'Mes post', component: <PostsMenuView usersPosts={usersPosts}/> },
    { name: 'Ajouter un post', component: <NewPostMenuView/> }
  ]

  const [currentMenu, setCurrentMenu] = useState(menuComponents[0])

  const selectedItem = useCallback((menuName) => {
    if (menuName === currentMenu.name) {
      return 'bg-black text-white'
    }
    return 'hover:bg-black hover:text-white'
  }, [currentMenu])

  const updateMenu = (index) => {
    setCurrentMenu(menuComponents[index])
  }

  return (
    <div className="relative w-full h-full flex">
      <Navbar userLogged/>
      <Popin title='' content='' handleValidate={deletePost}/>
      <div
        className="relative w-3/12 h-[88.7%] mt-20 pt-6 flex flex-col items-center border-r border-gray-300 bg-gray-200 shadow-2xl">
        <div className="px-4 pb-4 flex justify-center text-2xl w-full border-b border-black">
          <p className="mr-2">Bonjour,</p>
          <span className="font-bold">{username}</span>
        </div>
        {menuComponents.map((menu, index) =>
          <p key={index}
             className={`w-full px-4 py-8 flex justify-center text-lg
              ${selectedItem(menu.name)} transition-all duration-300 cursor-pointer`}
             onClick={() => updateMenu(index)}>
            {menu.name}
          </p>
        )}
        <div className="absolute bottom-8">
          <Button handleClick={logout} type="cancel" text="Déconnexion"/>
        </div>
      </div>
      {currentMenu.component}
    </div>
  )
}

export const getStaticPaths = async () => {
  return { paths: [{ params: { username: 'MarvelBoy' } }], fallback: false }
}

export const getStaticProps = async () => {
  return { props: { username: 'MarvelBoy' } }
}

export default Settings
