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
            <LandingSearchBox isTourShow={false} />
            <div className='flex items-center mt-20 mx-6 md:mx-28 gap-6 mb-10'>
                <div className='flex-1'>
                    <p className='shadow p-2 rounded-lg'>تعداد نتایج : 169</p>
                </div>
                <div className='flex-4'>
                    <div className='grid grid-cols-3 gap-6 items-center'>
                        <Image src={"/images/Ticket.png"} height={43} width={317} alt='تریپ جت' className='w-full' />
                        <div className='flex flex-col gap-4'>
                            <p className='font-bold text-xl'>تور ترکیبی بدروم ازمیر</p>
                            <p className='text-gray-600'>۱۴۰۳/۰۸/۰۴</p>
                            <p className='text-gray-600'>۶ شب و ۷ روز</p>
                            <p className='text-gray-600'>هتل ۵ ستاره</p>
                        </div>
                        <div className='flex flex-col gap-5 text-center'>
                            <p className='text-2xl font-bold'>45,250,000</p>
                            <button className='bg-blue-600 text-white p-3 rounded-xl'>مشاهده جزئیات و رزرو</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex items-center mt-20 mx-6 md:mx-28 gap-6 mb-10'>
                <div className='flex-4'>
                    <div className='grid grid-cols-3 gap-6 items-center'>
                        <Image src={"/images/Ticket.png"} height={43} width={317} alt='تریپ جت' className='w-full' />
                        <div className='flex flex-col gap-4'>
                            <p className='font-bold text-xl'>تور ترکیبی بدروم ازمیر</p>
                            <p className='text-gray-600'>۱۴۰۳/۰۸/۰۴</p>
                            <p className='text-gray-600'>۶ شب و ۷ روز</p>
                            <p className='text-gray-600'>هتل ۵ ستاره</p>
                        </div>
                        <div className='flex flex-col gap-5 text-center'>
                            <p className='text-2xl font-bold'>45,250,000</p>
                            <button className='bg-blue-600 text-white p-3 rounded-xl'>مشاهده جزئیات و رزرو</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex items-center mt-20 mx-6 md:mx-28 gap-6 mb-10'>
                <div className='flex-4'>
                    <div className='grid grid-cols-3 gap-6 items-center'>
                        <Image src={"/images/Ticket.png"} height={43} width={317} alt='تریپ جت' className='w-full' />
                        <div className='flex flex-col gap-4'>
                            <p className='font-bold text-xl'>تور ترکیبی بدروم ازمیر</p>
                            <p className='text-gray-600'>۱۴۰۳/۰۸/۰۴</p>
                            <p className='text-gray-600'>۶ شب و ۷ روز</p>
                            <p className='text-gray-600'>هتل ۵ ستاره</p>
                        </div>
                        <div className='flex flex-col gap-5 text-center'>
                            <p className='text-2xl font-bold'>45,250,000</p>
                            <button className='bg-blue-600 text-white p-3 rounded-xl'>مشاهده جزئیات و رزرو</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex items-center mt-20 mx-6 md:mx-28 gap-6 mb-10'>
                <div className='flex-4'>
                    <div className='grid grid-cols-3 gap-6 items-center'>
                        <Image src={"/images/Ticket.png"} height={43} width={317} alt='تریپ جت' className='w-full' />
                        <div className='flex flex-col gap-4'>
                            <p className='font-bold text-xl'>تور ترکیبی بدروم ازمیر</p>
                            <p className='text-gray-600'>۱۴۰۳/۰۸/۰۴</p>
                            <p className='text-gray-600'>۶ شب و ۷ روز</p>
                            <p className='text-gray-600'>هتل ۵ ستاره</p>
                        </div>
                        <div className='flex flex-col gap-5 text-center'>
                            <p className='text-2xl font-bold'>45,250,000</p>
                            <button className='bg-blue-600 text-white p-3 rounded-xl'>مشاهده جزئیات و رزرو</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex items-center mt-20 mx-6 md:mx-28 gap-6 mb-10'>
                <div className='flex-4'>
                    <div className='grid grid-cols-3 gap-6 items-center'>
                        <Image src={"/images/Ticket.png"} height={43} width={317} alt='تریپ جت' className='w-full' />
                        <div className='flex flex-col gap-4'>
                            <p className='font-bold text-xl'>تور ترکیبی بدروم ازمیر</p>
                            <p className='text-gray-600'>۱۴۰۳/۰۸/۰۴</p>
                            <p className='text-gray-600'>۶ شب و ۷ روز</p>
                            <p className='text-gray-600'>هتل ۵ ستاره</p>
                        </div>
                        <div className='flex flex-col gap-5 text-center'>
                            <p className='text-2xl font-bold'>45,250,000</p>
                            <button className='bg-blue-600 text-white p-3 rounded-xl'>مشاهده جزئیات و رزرو</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page