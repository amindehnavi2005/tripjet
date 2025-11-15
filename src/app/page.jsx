//* React | Next Imports
import React from 'react'
import Image from 'next/image'
//* Component Imports
import { Header } from '@/components/layout/common/Header'
import { LandingSearchBox } from '@/components/layout/landing/LandingSearchBox'

const page = () => {
  return (
    <div>
      <Header />
      <LandingSearchBox />
      <div className='grid mt-[100px] gap-6 md:mx-28 mx-6 mb-10'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <p>پیشنهادات ویژه</p>
          </div>
          <div className='flex items-center'>
            <p className='text-blue-600'>مشاهده همه</p>
          </div>
        </div>
        <div className='grid md:grid-cols-4 grid-cols-2 gap-6'>
          <div className='grid bg-amber-100 rounded-2xl'>
            <Image src={"/images/Ticket.png"} height={43} width={422} alt='تریپ جت' />
            <div className='flex flex-col gap-3 p-3'>
              <p>تور ژاپن به نا کجا آباد</p>
              <p>8 شب و 9 روز</p>
              <p>مهر و آبان و آذر</p>
              <div className='flex items-center justify-between'>
                <p>شروع قیمت از :</p>
                <p>75,900,000</p>
              </div>
            </div>
          </div>
          <div className='grid bg-amber-100 rounded-2xl'>
            <Image src={"/images/Ticket.png"} height={43} width={422} alt='تریپ جت' />
            <div className='flex flex-col gap-3 p-3'>
              <p>تور ژاپن به نا کجا آباد</p>
              <p>8 شب و 9 روز</p>
              <p>مهر و آبان و آذر</p>
              <div className='flex items-center justify-between'>
                <p>شروع قیمت از :</p>
                <p>75,900,000</p>
              </div>
            </div>
          </div>
          <div className='grid bg-amber-100 rounded-2xl'>
            <Image src={"/images/Ticket.png"} height={43} width={422} alt='تریپ جت' />
            <div className='flex flex-col gap-3 p-3'>
              <p>تور ژاپن به نا کجا آباد</p>
              <p>8 شب و 9 روز</p>
              <p>مهر و آبان و آذر</p>
              <div className='flex items-center justify-between'>
                <p>شروع قیمت از :</p>
                <p>75,900,000</p>
              </div>
            </div>
          </div>
          <div className='grid bg-amber-100 rounded-2xl'>
            <Image src={"/images/Ticket.png"} height={43} width={422} alt='تریپ جت' />
            <div className='flex flex-col gap-3 p-3'>
              <p>تور ژاپن به نا کجا آباد</p>
              <p>8 شب و 9 روز</p>
              <p>مهر و آبان و آذر</p>
              <div className='flex items-center justify-between'>
                <p>شروع قیمت از :</p>
                <p>75,900,000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page