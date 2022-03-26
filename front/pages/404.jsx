import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div className='relative w-full h-full flex flex-col items-center justify-center'>
      <h1 className='text-red-700 font-bold text-7xl'>404 | Oups</h1>
      <Image src='/images/devil.png' width={420} height={480} />
        <p className='text-black font-semibold text-lg animate-bounce'>On dirait que quelqu'un s'est perdu par ici...</p>
      <Link href='/'>
        <p className='text-red-600 font-semibold text-lg cursor-pointer'>Retourner en lieu sûr !🪂</p>
      </Link>
    </div>
  )
}

export default NotFound

