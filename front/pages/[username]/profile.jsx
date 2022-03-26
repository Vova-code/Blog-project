import React from 'react'
import Navbar from '../../src/components/Navbar'

const Profile = ({ username }) => {
  return (
    <div className="relative w-full h-full flex ">
      <Navbar/>
      <div className="w-2/12 mt-20 bg-gray-400">
        {username}
      </div>
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
