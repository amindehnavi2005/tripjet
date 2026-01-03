import React from 'react';

export default function Header() {
    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    {/* لوگو */}
                    <div className="text-2xl font-bold text-blue-600 flex items-center gap-2 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        تریپ‌جت
                    </div>
                    {/* منو */}
                    <nav className="hidden md:flex gap-6 text-sm text-gray-600">
                        <a href="#" className="hover:text-blue-600 transition">پرواز داخلی</a>
                        <a href="#" className="hover:text-blue-600 transition">پرواز خارجی</a>
                        <a href="#" className="hover:text-blue-600 transition">هتل</a>
                        <a href="#" className="hover:text-blue-600 transition">تور</a>
                    </nav>
                </div>
                {/* دکمه‌های سمت چپ */}
                <div className="flex items-center gap-3">
                    <button className="text-sm font-medium text-gray-600 hover:text-blue-600">پیگیری خرید</button>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition shadow-sm">ورود / ثبت‌نام</button>
                </div>
            </div>
        </header>
    );
}