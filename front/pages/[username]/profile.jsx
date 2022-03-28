import React, { useCallback, useContext, useState } from 'react'
import Navbar from '../../src/components/Navbar'
import NewPostMenuView from '../../src/components/NewPostMenuView'
import PostsMenuView from '../../src/components/PostsMenuView'
import AppContext from '../../src/utils/AppContext'


const Profile = ({ username }) => {
  const { logout, posts } = useContext(AppContext)
  const menuComponents = [
    { name: 'Mes post', component: <PostsMenuView posts={posts}/> },
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
      <div
        className="relative w-3/12 h-[88.7%] mt-20 pt-6 flex flex-col items-center border-r border-gray-300 bg-gray-200 shadow-2xl">
        <div className="mb-8 px-4 pb-4 flex justify-center text-2xl w-full border-b border-black">
          <p>Bonjour, </p>
          <span className="font-bold"> {username}</span>
        </div>
        {menuComponents.map((menu, index) =>
          <p key={index}
             className={`w-full mb-8 px-4 py-2 flex justify-center text-lg
              ${selectedItem(menu.name)} transition-all duration-300 cursor-pointer`}
             onClick={() => updateMenu(index)}>
            {menu.name}
          </p>
        )}
        <button
          onClick={() => logout()}
          className="absolute bottom-8 px-4 py-2 font-semibold rounded-2xl bg-red-500 hover:ring hover:ring-black transition-all duration-300">
          Déconnexion
        </button>
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

export default Profile
