import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import { HiOutlineUserCircle } from 'react-icons/hi'
import AppContext from '../utils/AppContext'

const Navbar = ({ userLogged }) => {
  const { username } = useContext(AppContext)
  const router = useRouter()

  const displayIcon = () => {
    return !(router.asPath === '/login' || router.asPath === '/signin' || (router.asPath === '/' && !userLogged));

  }

  return (
    <div
      className="absolute top-0 w-full h-20 z-10 flex bg-white/90 drop-shadow-md justify-between items-center border-b py-2 px-4">
      <Link href="/">
        <div className="flex items-center cursor-pointer">
          <Image src="/images/looney-astronomer.png" width={80} height={60} layout="fixed"/>
          <h3 className="ml-4 text-3xl font-semibold">BlogiBloga</h3>
        </div>
      </Link>
      {displayIcon() &&
      <Link href={`/${username}/profile`}>
        <HiOutlineUserCircle className="text-5xl cursor-pointer"/>
      </Link>}
      {!userLogged &&
      <div>
        <Link href="/signup">
          <button
            className="bg-white text-sm text-black px-4 py-2 font-semibold rounded-2xl border-2 border-black hover:ring hover:ring-red-600 transition-all duration-300">
            S'inscrire
          </button>
        </Link>
        <Link href="/login">
          <button
            className="bg-black text-sm text-white px-4 py-2 ml-4 rounded-2xl hover:ring hover:ring-red-600 transition-all duration-300">Se
            connecter
          </button>
        </Link>
      </div>
      }
    </div>
  )
}

export default Navbar
