"use client";
import React, { useState } from 'react';

export default function HomePage() {
  // مدیریت وضعیت صفحه: 'home' | 'results' | 'empty'
  const [pageState, setPageState] = useState('home');
  const [searchText, setSearchText] = useState('');

  // تابع تغییر وضعیت برای شبیه‌سازی جستجو
  const handleSearch = () => {
    if (!searchText.trim()) {
      alert("لطفا مقصدی را وارد کنید");
      return;
    }
    // لاجیک نمایشی: اگر کاربر بنویسد "هیچی" یا "empty"، حالت سوم را نشان بده
    if (searchText.includes("خالی") || searchText.includes("empty")) {
      setPageState('empty');
    } else {
      setPageState('results');
    }
  };

  // داده‌های ساختگی (Dummy Data) برای نمایش در صفحه اصلی
  const offers = [
    { id: 1, title: 'تور استانبول', price: '۱۲,۰۰۰,۰۰۰', image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=500&q=80' },
    { id: 2, title: 'تور دبی', price: '۱۵,۵۰۰,۰۰۰', image: 'https://images.unsplash.com/photo-1512453979798-5ea90b792d50?w=500&q=80' },
    { id: 3, title: 'تور کیش', price: '۵,۸۰۰,۰۰۰', image: 'https://images.unsplash.com/photo-1595839076088-72439a3f2824?w=500&q=80' },
    { id: 4, title: 'تور شیراز', price: '۴,۲۰۰,۰۰۰', image: 'https://images.unsplash.com/photo-1568630046399-6e3e4a274577?w=500&q=80' },
  ];

  const hotels = [
    { id: 1, name: 'هتل اسپیناس پالاس', city: 'تهران', stars: 5, price: '۳,۵۰۰,۰۰۰', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=80' },
    { id: 2, name: 'هتل درویشی', city: 'مشهد', stars: 5, price: '۲,۸۰۰,۰۰۰', image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=500&q=80' },
    { id: 3, name: 'هتل داریوش', city: 'کیش', stars: 4, price: '۴,۱۰۰,۰۰۰', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&q=80' },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 font-sans text-gray-800">

      {/* ================= HEADER ================= */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="text-2xl font-bold text-blue-600 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              تریپ‌جت
            </div>
            <nav className="hidden md:flex gap-6 text-sm text-gray-600">
              <a href="#" className="hover:text-blue-600">پرواز داخلی</a>
              <a href="#" className="hover:text-blue-600">پرواز خارجی</a>
              <a href="#" className="hover:text-blue-600">هتل</a>
              <a href="#" className="hover:text-blue-600">تور</a>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-sm font-medium text-gray-600 hover:text-blue-600">پیگیری خرید</button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition">ورود / ثبت‌نام</button>
          </div>
        </div>
      </header>

      {/* ================= HERO & SEARCH BOX ================= */}
      <div className="relative">
        {/* تصویر پس‌زمینه هیرو فقط در صفحه اصلی بزرگ است، در صفحات دیگر می‌توان کوچک کرد یا نگه داشت */}
        <div className={`w-full bg-blue-900 overflow-hidden relative ${pageState === 'home' ? 'h-[400px]' : 'h-[250px]'}`}>
          <img
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80"
            alt="Hero"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
            {pageState === 'home' && (
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center drop-shadow-md">
                با تریپ‌جت جهان در جیب شماست!
              </h1>
            )}
          </div>
        </div>

        {/* باکس جستجو - شناور */}
        <div className="container mx-auto px-4 relative -mt-16 z-20">
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
            <div className="flex gap-4 border-b pb-4 mb-4 text-sm font-medium text-gray-500 overflow-x-auto">
              <button className="text-blue-600 border-b-2 border-blue-600 pb-1 flex items-center gap-2 px-2 whitespace-nowrap">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                پرواز داخلی
              </button>
              <button className="hover:text-blue-600 flex items-center gap-2 px-2 whitespace-nowrap">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" /></svg>
                پرواز خارجی
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              <div className="md:col-span-4 relative">
                <label className="text-xs text-gray-500 mb-1 block">مبدا / مقصد</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 bg-gray-50"
                  placeholder="جستجوی شهر یا کشور (بنویسید 'خالی' برای تست حالت خالی)"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <div className="md:col-span-3 relative">
                <label className="text-xs text-gray-500 mb-1 block">تاریخ رفت</label>
                <div className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-600 cursor-pointer flex justify-between">
                  <span>انتخاب تاریخ</span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
              </div>
              <div className="md:col-span-3 relative">
                <label className="text-xs text-gray-500 mb-1 block">مسافران</label>
                <div className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-600 cursor-pointer flex justify-between">
                  <span>۱ بزرگسال</span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                </div>
              </div>
              <div className="md:col-span-2">
                <button
                  onClick={handleSearch}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition shadow-md"
                >
                  جستجو
                </button>
              </div>
            </div>

            {/* جستجوهای اخیر - فقط در هوم پیج */}
            {pageState === 'home' && (
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-500 items-center">
                <span>جستجوهای اخیر:</span>
                <span className="bg-gray-100 px-2 py-1 rounded cursor-pointer hover:bg-gray-200">تهران به مشهد</span>
                <span className="bg-gray-100 px-2 py-1 rounded cursor-pointer hover:bg-gray-200">تهران به کیش</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= MAIN CONTENT LOGIC ================= */}
      <main className="container mx-auto px-4 py-8 min-h-[500px]">

        {/* ---------------- STATE 1: HOME PAGE ---------------- */}
        {pageState === 'home' && (
          <div className="space-y-12">

            {/* پیشنهادات ویژه */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
                  پیشنهادهای ویژه
                </h2>
                <a href="#" className="text-blue-600 text-sm">مشاهده همه</a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {offers.map((offer) => (
                  <div key={offer.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden group border border-gray-100">
                    <div className="relative h-40 overflow-hidden">
                      <img src={offer.image} alt={offer.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                      <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">ویژه</span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold mb-2">{offer.title}</h3>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">شروع از</span>
                        <span className="text-blue-600 font-bold">{offer.price} <span className="text-xs text-gray-400">تومان</span></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* بنر وسط */}
            <section className="bg-blue-50 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-right">
                <h2 className="text-2xl font-bold mb-2 text-blue-800">چرا تریپ‌جت؟</h2>
                <p className="text-gray-600 mb-4 max-w-md">پشتیبانی ۲۴ ساعته، تضمین بهترین قیمت و کنسلی آنلاین تنها بخشی از خدمات ماست.</p>
                <div className="flex gap-4 justify-center md:justify-start">
                  <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm">
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span className="text-xs font-medium">تضمین قیمت</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm">
                    <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    <span className="text-xs font-medium">پشتیبانی ۲۴/۷</span>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/3">
                <div className="bg-blue-200 h-48 rounded-xl flex items-center justify-center">
                  <span className="text-blue-800 opacity-50 text-6xl">illustration</span>
                </div>
              </div>
            </section>

            {/* هتل‌های مناسب */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <span className="w-2 h-6 bg-orange-500 rounded-full"></span>
                  هتل‌های محبوب
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {hotels.map((hotel) => (
                  <div key={hotel.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 flex gap-4">
                    <img src={hotel.image} alt={hotel.name} className="w-24 h-24 rounded-lg object-cover" />
                    <div className="flex flex-col justify-between py-1 w-full">
                      <div>
                        <h3 className="font-bold text-sm mb-1">{hotel.name}</h3>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                          {hotel.city}
                        </span>
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="flex text-yellow-400 text-xs">
                          {[...Array(hotel.stars)].map((_, i) => <span key={i}>★</span>)}
                        </div>
                        <span className="text-blue-600 font-bold text-sm">{hotel.price} <small className="text-gray-400">تومان</small></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ---------------- LAYOUT FOR RESULTS & EMPTY STATE (SIDEBAR + CONTENT) ---------------- */}
        {(pageState === 'results' || pageState === 'empty') && (
          <div className="flex flex-col lg:flex-row gap-6 mt-8">

            {/* SIDEBAR (FILTERS) - COMMON IN BOTH */}
            <aside className="w-full lg:w-1/4 space-y-4">
              {/* فیلتر نتایج */}
              <div className="bg-white border rounded-xl p-4 shadow-sm">
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                  <span className="font-bold text-gray-700">فیلترها</span>
                  <span className="text-xs text-red-500 cursor-pointer">حذف فیلترها</span>
                </div>

                {/* محدوده قیمت */}
                <div className="mb-6">
                  <label className="text-sm font-medium mb-2 block">محدوده قیمت</label>
                  <input type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>کمترین</span>
                    <span>بیشترین</span>
                  </div>
                </div>

                {/* نوع پرواز */}
                <div className="mb-6">
                  <label className="text-sm font-medium mb-2 block">نوع پرواز</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                      <span className="text-sm text-gray-600">سیستمی</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                      <span className="text-sm text-gray-600">چارتر</span>
                    </label>
                  </div>
                </div>

                {/* ایرلاین‌ها */}
                <div className="mb-2">
                  <label className="text-sm font-medium mb-2 block">ایرلاین‌ها</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded text-blue-600" />
                      <span className="text-sm text-gray-600">ماهان</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded text-blue-600" />
                      <span className="text-sm text-gray-600">ایران ایر</span>
                    </label>
                  </div>
                </div>
              </div>
            </aside>

            {/* CONTENT AREA */}
            <div className="w-full lg:w-3/4">

              {/* STATE 2: SEARCH RESULTS LIST */}
              {pageState === 'results' && (
                <div className="space-y-4">
                  {/* Header of results */}
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-700">نتایج جستجو برای "{searchText}"</h3>
                    <div className="text-sm text-gray-500">
                      مرتب‌سازی: <span className="font-medium text-black cursor-pointer">پیشنهادی</span>
                    </div>
                  </div>

                  {/* Result Cards Loop */}
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div key={item} className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col md:flex-row gap-4 hover:shadow-md transition">
                      <div className="w-full md:w-48 h-32 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                        <img src={`https://images.unsplash.com/photo-1542296332-2e44a9916199?w=300&q=80&random=${item}`} alt="Flight" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-lg mb-1">هتل بزرگ آزادی {item}</h4>
                            <div className="text-xs text-gray-500 mb-2">۵ ستاره • مرکز شهر</div>
                            <div className="flex gap-2">
                              <span className="bg-blue-50 text-blue-600 text-[10px] px-2 py-1 rounded">صبحانه رایگان</span>
                              <span className="bg-green-50 text-green-600 text-[10px] px-2 py-1 rounded">کنسلی رایگان</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-gray-400 text-xs line-through">۴,۵۰۰,۰۰۰</span>
                            <span className="text-blue-600 font-bold text-xl">۳,۲۰۰,۰۰۰ <span className="text-xs font-normal text-gray-500">تومان</span></span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-4 border-t pt-3 border-dashed">
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            پرواز رفت: ۰۸:۳۰
                          </div>
                          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">انتخاب اتاق</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* STATE 3: NO RESULTS (EMPTY) */}
              {pageState === 'empty' && (
                <div className="bg-white rounded-xl border border-gray-200 p-12 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
                  <div className="w-48 h-48 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-24 h-24 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">نتیجه‌ای یافت نشد!</h3>
                  <p className="text-gray-500 max-w-sm mb-6">متاسفانه برای جستجوی شما موردی پیدا نشد. لطفا تاریخ یا فیلترهای خود را تغییر دهید.</p>
                  <button
                    onClick={() => { setSearchText(''); setPageState('home'); }}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    بازگشت به صفحه اصلی
                  </button>
                </div>
              )}

            </div>
          </div>
        )}
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-white border-t mt-12 pt-12 pb-6">
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
                <li><a href="#" className="hover:text-blue-600">انتقادات و پیشنهادات</a></li>
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
          <div className="border-t pt-6 text-center text-xs text-gray-400 flex flex-col md:flex-row justify-between items-center">
            <p>کلیه حقوق این وب‌سایت محفوظ است © ۱۴۰۳</p>
            <div className="flex gap-4 mt-2 md:mt-0">
              <span>Instagram</span>
              <span>Twitter</span>
              <span>Linkedin</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}