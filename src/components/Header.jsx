import Link from "next/link";

export default function Header({ isLoggedIn, user, onOpenLogin }) {
    return (
        <header className="bg-white shadow-sm sticky top-0 z-50 py-4">
            <div className="container mx-auto px-4 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <span className="text-2xl font-black text-blue-600">تریپ جت</span>
                    <nav className="hidden lg:flex gap-6 text-[13px] font-bold text-gray-500">
                        <a href="#" className="hover:text-blue-600">تورهای داخلی ▾</a>
                        <a href="#" className="hover:text-blue-600">تورهای خارجی ▾</a>
                        <a href="#" className="hover:text-blue-600">بیمه مسافرتی</a>
                        <a href="#" className="hover:text-blue-600">بیشتر ▾</a>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <button className="p-2 text-gray-400 hover:text-blue-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></button>
                    <a href="tel:02170709797" className="hidden md:flex items-center gap-2 border px-4 py-2 rounded-xl text-blue-600 font-bold text-xs">۰۲۱۷۰۷۰۹۷۹۷ 📞</a>

                    {isLoggedIn ? (
                        /* نمایش نام کاربر بعد از لاگین */
                        <Link
                            href="/profile"
                            className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-sm font-bold border border-blue-100 hover:bg-blue-100 transition"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                            {user.name}
                        </Link>
                    ) : (
                        /* نمایش دکمه ورود اگر لاگین نکرده باشد */
                        <button
                            onClick={onOpenLogin}
                            className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-blue-700 transition"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                            ورود / ثبت‌نام
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}