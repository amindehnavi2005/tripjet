"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HomePage() {
  const router = useRouter();

  // --- States (جستجو و وضعیت صفحه) ---
  const [pageState, setPageState] = useState('home'); // 'home' | 'results' | 'empty'
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // --- States (ورود و مودال) ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [phoneInput, setPhoneInput] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // آدرس‌های بک‌اِند PHP
  const SEARCH_API = "http://localhost/tripjet-backend/search.php";
  const AUTH_API = "http://localhost/tripjet-backend/auth.php";

  // --- Functions (جستجو) ---
  const handleSearch = async () => {
    if (!searchText.trim()) {
      alert("لطفا مقصدی را وارد کنید");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${SEARCH_API}?q=${searchText}`);
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setResults(data);
        setPageState('results');
      } else {
        setResults([]);
        setPageState('empty');
      }
    } catch (error) {
      console.error("Search Error:", error);
      alert("خطا در ارتباط با سرور جستجو");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSearchText('');
    setPageState('home');
    setResults([]);
  };

  // --- Functions (ورود / ثبت‌نام) ---
  const handleLoginSubmit = async () => {
    if (phoneInput.length < 10) {
      alert("لطفا شماره موبایل معتبر (۱۰ رقم) وارد کنید");
      return;
    }

    setAuthLoading(true);
    try {
      // ارسال درخواست به auth.php
      const response = await fetch(`${AUTH_API}?action=login&phone=${phoneInput}`);
      const data = await response.json();

      if (data.success) {
        setIsLoggedIn(true);
        setUser(data.user);
        setShowLoginModal(false);
        // ذخیره در LocalStorage برای ماندگاری (اختیاری)
        localStorage.setItem('user', JSON.stringify(data.user));
      } else {
        alert(data.message || "خطا در ورود");
      }
    } catch (error) {
      console.error("Auth Error:", error);
      alert("خطا در اتصال به سرور احراز هویت");
    } finally {
      setAuthLoading(false);
    }
  };

  const goToDetails = (id) => router.push(`/tour/${id}`);

  // چک کردن لاگین قبلی هنگام لود صفحه
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  // --- Static Data ---
  const offers = [
    { id: 101, title: 'تور استانبول', price: '۱۲,۰۰۰,۰۰۰', image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=500&q=80' },
    { id: 102, title: 'تور دبی', price: '۱۵,۵۰۰,۰۰۰', image: 'https://images.unsplash.com/photo-1512453979798-5ea90b792d50?w=500&q=80' },
    { id: 103, title: 'تور کیش', price: '۵,۸۰۰,۰۰۰', image: 'https://images.unsplash.com/photo-1595839076088-72439a3f2824?w=500&q=80' },
    { id: 104, title: 'تور شیراز', price: '۴,۲۰۰,۰۰۰', image: 'https://images.unsplash.com/photo-1568630046399-6e3e4a274577?w=500&q=80' },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col relative">

      {/* هدر: وضعیت لاگین را به آن پاس می‌دهیم */}
      <Header
        isLoggedIn={isLoggedIn}
        user={user}
        onOpenLogin={() => setShowLoginModal(true)}
      />

      {/* ================= HERO & SEARCH BOX ================= */}
      <div className="relative">
        <div className={`w-full bg-blue-900 overflow-hidden relative transition-all duration-500 ${pageState === 'home' ? 'h-[400px]' : 'h-[250px]'}`}>
          <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80" alt="Hero" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-center">
            {pageState === 'home' && <h1 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-md">با تریپ‌جت جهان در جیب شماست!</h1>}
          </div>
        </div>

        <div className="container mx-auto px-4 relative -mt-16 z-20">
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              <div className="md:col-span-10 relative">
                <label className="text-xs text-gray-500 mb-1 block">مبدا / مقصد</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 bg-gray-50"
                  placeholder="جستجوی شهر یا کشور..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <div className="md:col-span-2">
                <button onClick={handleSearch} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition shadow-md">
                  {loading ? '...' : 'جستجو'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <main className="container mx-auto px-4 py-8 flex-grow">
        {pageState === 'home' && (
          <div className="space-y-12">
            <section>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><span className="w-2 h-6 bg-blue-600 rounded-full"></span> پیشنهادهای ویژه</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {offers.map((offer) => (
                  <div key={offer.id} onClick={() => goToDetails(offer.id)} className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden group border border-gray-100 cursor-pointer">
                    <img src={offer.image} className="w-full h-40 object-cover group-hover:scale-105 transition duration-500" />
                    <div className="p-4">
                      <h3 className="font-bold mb-2">{offer.title}</h3>
                      <p className="text-blue-600 font-bold text-sm">{offer.price} تومان</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {pageState === 'results' && (
          <div className="space-y-4">
            {results.map((item) => (
              <div key={item.id} onClick={() => goToDetails(item.id)} className="bg-white p-4 rounded-xl border flex gap-4 cursor-pointer hover:shadow-md transition">
                <img src={item.image} className="w-32 h-32 rounded-lg object-cover" />
                <div className="flex flex-col justify-center">
                  <h4 className="font-bold text-lg">{item.title}</h4>
                  <p className="text-blue-600 font-bold mt-2">{item.price} تومان</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {pageState === 'empty' && (
          <div className="text-center py-20 bg-white rounded-xl border">
            <h3 className="text-xl font-bold mb-4">نتیجه‌ای یافت نشد!</h3>
            <button onClick={handleReset} className="text-blue-600 underline">بازگشت</button>
          </div>
        )}
      </main>

      <Footer />

      {/* ================= LOGIN MODAL (مطابق تصویر) ================= */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-300">
            {/* دکمه بستن */}
            <button onClick={() => setShowLoginModal(false)} className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="p-10 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">ورود یا ثبت‌نام</h2>
              <p className="text-gray-500 text-sm mb-10">برای ادامه شماره موبایل خود را وارد کنید.</p>

              <div className="relative mb-8 text-right">
                <label className="text-xs text-gray-400 absolute -top-2 right-4 bg-white px-1 z-10 font-medium">شماره موبایل</label>
                <div className="flex items-center border-2 border-gray-100 rounded-2xl px-4 py-4 focus-within:border-blue-500 transition-all bg-gray-50/50">
                  <span className="text-gray-400 font-bold border-l pl-3 ml-3 text-sm" dir="ltr">+۹۸</span>
                  <input
                    type="tel"
                    className="w-full bg-transparent focus:outline-none text-left tracking-[0.2em] font-bold text-lg"
                    placeholder="9123456789"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    dir="ltr"
                  />
                </div>
              </div>

              <button
                onClick={handleLoginSubmit}
                disabled={authLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition shadow-lg shadow-blue-200 text-lg"
              >
                {authLoading ? 'در حال تایید...' : 'تایید و ادامه'}
              </button>

              <p className="text-[11px] text-gray-400 mt-8 leading-6">
                با ورود به تریپ‌جت، <span className="text-blue-500 underline cursor-pointer">قوانین و مقررات</span> ما را می‌پذیرید.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}