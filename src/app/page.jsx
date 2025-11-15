//* React | Next Imports
import React from 'react'
import Image from 'next/image'
//* Component Imports
import { Header } from '@/components/layout/common/Header'
import { LandingSearchBox } from '@/components/layout/landing/LandingSearchBox'
import { LandingTourSection } from '@/components/layout/landing/LandingTourSection'
import { Footer } from '@/components/layout/common/Footer'

const page = () => {
  return (
    <div>
      <Header />
      <LandingSearchBox />
      <LandingTourSection />
      <LandingTourSection title='تور های محبوب' />
      <Footer />
    </div>
  )
}

export default page