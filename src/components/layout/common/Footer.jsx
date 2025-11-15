//* React | Next Imports
import React from 'react'
import Image from 'next/image'

export const Footer = () => {
    return (
        <>
            <div className='mt-[100px] grid grid-cols-5 items-center gap-6 mb-10'>
                <div className='grid col-span-2 gap-6 mx-5 md:mx-28'>
                    <Image src={"/images/Logo.png"} height={43} width={153} alt='تریپ جت' />
                    <p>تلفن پشتیبانی : ۰۲۱۷۰۷۰۹۷۹۷</p>
                    <p>آدرس دفتر مرکزی : تهران، سعادت آباد، خیابان کاج، پلاک ۱۶</p>
                    <p>آدرس ایمیل : tripjet@gmail.com</p>
                </div>
                <div className='grid gap-6 mx-5 md:mx-28'>
                    <p className=''>تریپ جت</p>
                    <p className='text-xs'>درباره ما</p>
                    <p className='text-xs'>تماس با ما</p>
                </div>
                <div className='grid gap-6 mx-5 md:mx-28'>
                    <p>تریپ جت</p>
                    <p className='text-xs'>درباره ما</p>
                    <p className='text-xs'>تماس با ما</p>
                </div>
                <div className='grid gap-6 mx-5 md:mx-28'>
                    <p>تریپ جت</p>
                    <p className='text-xs'>درباره ما</p>
                    <p className='text-xs'>تماس با ما</p>
                </div>
            </div>
            <hr className='my-5 mx-5 md:mx-28' />
            <p className='text-center mb-5 text-sm'>تمامی حقوق این وبگاه محفوظ و مربوط به آژانس مسافرتی تریپ جت است.</p>
        </>
    )
}
