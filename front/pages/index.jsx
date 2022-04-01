import Head from 'next/head'
import { useContext } from 'react'
import Navbar from '../src/components/molecules/Navbar'
import Post from '../src/components/molecules/Post'

import { VscGithub } from 'react-icons/vsc'
import AppContext from '../src/utils/AppContext'

const Home = () => {
  const { posts, isUserLogged } = useContext(AppContext)

  return (
    <div className="relative">
      <Head>
        <title>BlogiBloga</title>
        <meta name="description" content="Say what's in your head, not in your heart"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <div className="sticky top-0 width-full h-24 z-10">
        <Navbar userLogged={isUserLogged}/>
      </div>

      <div className="flex flex-col mt-8 py-6 px-2 items-center">
        {posts.map((post, index) => (<Post key={index} post={post} isAdminInterface={false}/>))}
      </div>

      <footer className="flex justify-center items-center h-16 border-t border-black">
        <p>Blogibloga school project made by{' '}</p>
        <a className="flex justify-center items-center hover:text-red-600"
           href="https://github.com/Vova-code/Blog-project"
           target="_blank" rel="noopener noreferrer">
          <VscGithub className="ml-2 mr-2"/>
          <p className="font-semibold hover:text-red-600">Vova-code</p>
        </a>
      </footer>
    </div>
  )
}

export default Home
