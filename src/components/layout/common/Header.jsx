//* React | Next Imports
import React from 'react'
import Image from 'next/image'
//* Package Imports
import { ArrowRight, Phone } from 'lucide-react'
import Link from 'next/link'

export const Header = () => {
    return (
        <div className='md:px-28 py-6 px-6 flex justify-between gap-14 items-center'>
            <Image src={"/images/Logo.png"} height={43} width={153} alt='تریپ جت' />
            <div className='grid grid-cols-4 gap-8 items-center'>
                <p>تور های داخلی</p>
                <Link href={"/outside-tours"}>تور های خارجی</Link>
                <p>بیمه مسافرتی</p>
                <p>بیشتر</p>
            </div>
            <div className='grid grid-cols-2 gap-8 items-center'>
                <button className='bg-blue-600 rounded-xl py-3 px-4 text-white flex gap-2 items-center'>
                    <ArrowRight />
                    <p>ورود/ ثبت نام</p>
                </button>
                <button className='rounded-xl py-3 px-4 border border-blue-600 text-blue-600 flex gap-2 items-center'>
                    <p>09123456789</p>
                    <Phone className='text-blue-600' />
                </button>
            </div>
        </div>
    )
}
