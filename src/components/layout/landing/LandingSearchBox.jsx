//* React | Next Imports
import React from 'react'
import Image from 'next/image'

export const LandingSearchBox = () => {
    return (
        <div className='relative'>
            <Image src={"/images/LandingBanner.png"} height={43} width={800} alt='تریپ جت' className='w-full' />
            <div className='absolute -bottom-10 border-2 rounded-xl md:right-[25%] right-0 md:mx-28 mx-6 p-6 grid gap-14 items-center bg-white'>
                <div className='flex items-center gap-8'>
                    <p>تور های خارجی</p>
                    <p>تور های داخلی</p>
                </div>
                <div className='flex items-center gap-8'>
                    <input placeholder='مبدا' />
                    <input placeholder='مقصد' />
                    <button className='rounded-lg bg-blue-600 px-4 py-1 text-white'>جستجو</button>
                </div>
            </div>
        </div>
    )
}
