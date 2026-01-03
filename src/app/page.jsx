"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HomePage() {
  const router = useRouter();
  const [pageState, setPageState] = useState('home');
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [landingData, setLandingData] = useState({ special_offers: [], reviews: [] });

  const API_BASE = "http://localhost/tripjet-backend/search.php";

  useEffect(() => {
    // گرفتن دیتای لندینگ
    fetch(`${API_BASE}?action=landing_data`)
      .then(res => res.json())
      .then(data => setLandingData(data));

    const savedUser = localStorage.getItem('user');
    if (savedUser) { setIsLoggedIn(true); setUser(JSON.parse(savedUser)); }
  }, []);

  const handleSearch = async () => {
    if (!searchText.trim()) return;
    setLoading(true);
    const res = await fetch(`${API_BASE}?action=search&q=${searchText}`);
    const data = await res.json();
    setPageState(data.length > 0 ? 'results' : 'empty');
    setLoading(false);
  };

  // --- کارد پیشنهاد ویژه (مطابق تصویر اول) ---
  const TourCard = ({ tour }) => (
    <div onClick={() => router.push(`/tour/${tour.id}`)} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 group">
      <div className="relative h-56 overflow-hidden">
        <img src={tour.image} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <span className="bg-red-500/90 text-white text-[10px] px-2 py-1 rounded-full backdrop-blur-sm">🔥 {tour.discount} تخفیف</span>
          <span className="bg-blue-600/90 text-white text-[10px] px-2 py-1 rounded-full backdrop-blur-sm">👤 {tour.capacity} باقیمانده</span>
        </div>
        <button className="absolute top-3 right-3 bg-white/50 p-2 rounded-full backdrop-blur-md text-white hover:bg-red-500 transition">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
        </button>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-gray-800 mb-3">{tour.title}</h3>
        <div className="flex justify-between text-[11px] text-gray-500 mb-4">
          <span className="flex items-center gap-1"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> {tour.duration}</span>
          <span className="flex items-center gap-1"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> مهر و آبان ۱۴۰۳</span>
        </div>
        <div className="flex justify-between items-end">
          <span className="text-[10px] text-gray-400">شروع قیمت از</span>
          <div className="text-left">
            <span className="block text-[10px] text-gray-400 line-through decoration-red-400">{tour.old_price}</span>
            <span className="text-blue-600 font-black text-lg">{tour.price} <small className="text-[10px] font-normal">تومان</small></span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div dir="rtl" className="min-h-screen bg-[#F9FBFF] font-sans text-gray-800 flex flex-col">
      <Header isLoggedIn={isLoggedIn} user={user} onOpenLogin={() => setShowLoginModal(true)} />

      {/* --- HERO & SEARCH (Image 1) --- */}
      <div className="relative h-[480px] bg-blue-900 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-black mb-4">با تریپ‌جت جهان در جیب شماست!</h1>
          <p className="text-lg opacity-80">پیشنهادات ویژه متناسب با هدف شما</p>
        </div>

        {/* Search Box */}
        <div className="container mx-auto px-4 absolute -bottom-10 left-0 right-0 z-20">
          <div className="bg-white rounded-[32px] shadow-2xl p-6 md:p-8">
            <div className="flex gap-6 border-b mb-6 text-sm font-bold text-gray-400">
              <button className="text-blue-600 border-b-2 border-blue-600 pb-3">تورهای خارجی</button>
              <button className="hover:text-blue-600 pb-3">تورهای داخلی</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-5 relative border rounded-2xl px-4 py-3 bg-gray-50">
                <label className="text-[10px] text-gray-400 block">مبدا</label>
                <select className="w-full bg-transparent font-bold text-sm outline-none"><option>تهران</option></select>
              </div>
              <div className="md:col-span-5 relative border rounded-2xl px-4 py-3 bg-gray-50">
                <label className="text-[10px] text-gray-400 block">مقصد</label>
                <input value={searchText} onChange={e => setSearchText(e.target.value)} placeholder="هند" className="w-full bg-transparent font-bold text-sm outline-none" />
              </div>
              <div className="md:col-span-2">
                <button onClick={handleSearch} className="w-full bg-blue-600 h-14 rounded-2xl text-white font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition">جستجو</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 mt-24 mb-20 space-y-24">

        {/* --- RECENT SEARCHES --- */}
        <section className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-2 font-bold"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> جستجوهای اخیر:</span>
          {['تهران به چک', 'تهران به فرانسه', 'تهران به سوئیس'].map(s => (
            <span key={s} className="bg-white border px-4 py-2 rounded-xl flex items-center gap-2 hover:border-blue-300 cursor-pointer">{s} <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 7h12m0 0l-4-4m4 4l-4 4m-8 6H4m0 0l4 4m-4-4l4-4" /></svg></span>
          ))}
          <button className="text-blue-500 mr-auto">پاک کردن همه</button>
        </section>

        {/* --- SPECIAL OFFERS (Image 1) --- */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black flex items-center gap-3"><span className="p-2 bg-blue-100 rounded-xl"><svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5a2 2 0 00-2 2h2z" /></svg></span> پیشنهادات ویژه</h2>
            <button className="text-blue-600 font-bold text-sm">مشاهده همه ‹</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {landingData.special_offers.map(tour => <TourCard key={tour.id} tour={tour} />)}
          </div>
        </section>

        {/* --- WHY TRIPJET (Image 2) --- */}
        <section className="text-center">
          <h2 className="text-2xl font-black mb-16">حالا چرا تریپ جت؟</h2>
          <div className="relative flex justify-center items-center h-[400px]">
            <div className="absolute left-10 top-0 flex flex-col gap-10">
              <div className="bg-white p-4 rounded-2xl shadow-sm border flex items-center gap-3 w-60"><span className="p-2 bg-blue-50 rounded-lg">✈️</span> ارائه تورهای خارجی</div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border flex items-center gap-3 w-60 ml-10"><span className="p-2 bg-blue-50 rounded-lg">⭐</span> بیشترین تعداد تور</div>
            </div>
            <div className="w-64 h-64 bg-blue-600 rounded-[60px] relative z-10 overflow-hidden shadow-2xl rotate-12">
              <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400" className="w-full h-full object-cover -rotate-12" />
            </div>
            <div className="absolute right-10 top-0 flex flex-col gap-10">
              <div className="bg-white p-4 rounded-2xl shadow-sm border flex items-center gap-3 w-60"><span className="p-2 bg-blue-50 rounded-lg">📍</span> هرجا که بخوای</div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border flex items-center gap-3 w-60 mr-10"><span className="p-2 bg-blue-50 rounded-lg">📞</span> پشتیبانی ۲۴ ساعته</div>
            </div>
          </div>
        </section>

        {/* --- CATEGORIES (Image 2) --- */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black flex items-center gap-3">📂 دسته‌بندی تورها</h2>
            <div className="flex gap-2">
              {['لوکس ترین', 'تورهای ویژه', 'تعطیلات آخر هفته'].map((c, i) => (
                <button key={c} className={`px-6 py-2 rounded-xl text-sm font-bold ${i === 0 ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white text-gray-400 border'}`}>{c}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { t: 'تور تاجیکستان', p: '۳۹,۴۰۰,۰۰۰', img: 'https://images.unsplash.com/photo-1528154291023-a6525fabe5b4?w=400' },
              { t: 'تور فرانسه', p: '۵۹,۹۹۰,۰۰۰', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400' },
              { t: 'تور ازبکستان', p: '۲۴,۰۰۰,۰۰۰', img: 'https://images.unsplash.com/photo-1528154291023-a6525fabe5b4?w=400' }
            ].map(item => (
              <div key={item.t} className="bg-white border rounded-3xl p-4 flex gap-4 items-center hover:shadow-lg transition cursor-pointer">
                <img src={item.img} className="w-24 h-24 rounded-2xl object-cover" />
                <div>
                  <h4 className="font-bold mb-2">{item.t}</h4>
                  <p className="text-blue-600 font-black text-sm">{item.p} <small className="text-gray-400 font-normal">تومان</small></p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- REVIEWS (Image 2) --- */}
        <section>
          <h2 className="text-2xl font-black mb-8 flex items-center gap-3">💬 نظرات کاربران</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {landingData.reviews.map(rev => (
              <div key={rev.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <img src="https://i.pravatar.cc/150" className="w-12 h-12 rounded-full border-2 border-blue-100" />
                  <div>
                    <h4 className="font-bold text-sm">{rev.user}</h4>
                    <span className="text-[10px] text-gray-400">تاریخ سفر: {rev.date}</span>
                  </div>
                  <div className="mr-auto text-yellow-400 text-xs">{'★'.repeat(rev.rating)}</div>
                </div>
                <p className="text-gray-600 text-xs leading-6 text-justify">{rev.comment}</p>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
      {/* مودال ورود (همان نسخه قبلی که کامل بود) */}
      {showLoginModal && (<LoginModal onClose={() => setShowLoginModal(false)} />)}
    </div>
  );
}