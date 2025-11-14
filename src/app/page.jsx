//* React | Next Imports
import React from 'react'
import Image from 'next/image'
//* Component Imports
import { Header } from '@/components/layout/common/Header'

const page = () => {
  return (
    <div>
      <Header />
      <Image src={"/images/LandingBanner.png"} height={43} width={800} alt='تریپ جت' className='w-full' />
      
    </div>
  )
}

export default page