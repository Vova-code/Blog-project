import Head from 'next/head'
import Image from 'next/image'
import { useContext } from 'react'
import Navbar from '../src/components/molecules/Navbar'
import Post from '../src/components/molecules/Post'

import AppContext from '../src/utils/AppContext'
import styles from '../styles/Home.module.css'

const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }

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
        {posts.map((post, index) => (<Post key={index} post={post} isAdminInterface={false} />))}
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
