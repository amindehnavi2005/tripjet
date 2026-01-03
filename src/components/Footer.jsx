import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-white border-t mt-12 pt-12 pb-6 text-right" dir="rtl">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h4 className="font-bold text-lg mb-4 text-blue-900">تریپ‌جت</h4>
                        <p className="text-sm text-gray-500 leading-6">
                            تریپ‌جت سامانه آنلاین خرید بلیط هواپیما، بلیط قطار، بلیط اتوبوس و رزرو هتل است. ما بهترین قیمت‌ها را تضمین می‌کنیم.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-700 mb-4">دسترسی سریع</h4>
                        <ul className="text-sm text-gray-500 space-y-2">
                            <li><a href="#" className="hover:text-blue-600">درباره ما</a></li>
                            <li><a href="#" className="hover:text-blue-600">تماس با ما</a></li>
                            <li><a href="#" className="hover:text-blue-600">قوانین و مقررات</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-700 mb-4">خدمات مشتریان</h4>
                        <ul className="text-sm text-gray-500 space-y-2">
                            <li><a href="#" className="hover:text-blue-600">مرکز راهنمایی</a></li>
                            <li><a href="#" className="hover:text-blue-600">کالای مرجوعی</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-700 mb-4">عضویت در خبرنامه</h4>
                        <div className="flex gap-2">
                            <input type="email" placeholder="ایمیل خود را وارد کنید" className="border rounded px-3 py-2 text-sm w-full bg-gray-50 focus:outline-blue-500" />
                            <button className="bg-blue-600 text-white px-3 py-2 rounded text-sm">عضویت</button>
                        </div>
                    </div>
                </div>
                <div className="border-t pt-6 text-center text-xs text-gray-400">
                    <p>کلیه حقوق این وب‌سایت محفوظ است © ۱۴۰۳</p>
                </div>
            </div>
        </footer>
    );
}