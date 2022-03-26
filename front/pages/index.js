import Head from 'next/head'
import Image from 'next/image'
import { useContext } from 'react'
import Navbar from '../src/components/Navbar'

import AppContext from '../src/utils/AppContext'
import styles from '../styles/Home.module.css'

const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }

const Home = () => {
  const { posts, isUserLogged } = useContext(AppContext)

  return (
    <div className="relative h-full">
      <Head>
        <title>BlogiBloga</title>
        <meta name="description" content="Say what's in your head, not in your heart"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <div className="sticky top-0 width-full h-24 z-10">
        <Navbar userLogged={isUserLogged}/>
      </div>

      <div className="h-screen flex flex-col mt-8 py-6 px-2 items-center">
        {posts.map((post, index) => (
          <div key={index}
               className="relative w-4/5 mb-20 p-12 border-black border bg-white/75 rounded-2xl
               hover:shadow-lg hover:shadow-2xl hover:cursor-pointer transition-all durations-600">
            <h2 className="mb-4 font-semibold text-2xl">{post.title}</h2>
            <span>{post.content}</span>
            <div className="absolute bottom-4 right-4 flex italic text-xs">
              <p>publié le {new Date(Number(post.created_at)).toLocaleString('fr-FR', options)} par</p>
              <span
                className="ml-1 font-bold hover:text-red-600 cursor-pointer transition-all duration-300">{post.author}</span>
            </div>
          </div>
        ))}
      </div>

      <footer className="">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16}/>
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
