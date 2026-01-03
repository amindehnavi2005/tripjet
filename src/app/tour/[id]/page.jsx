"use client";
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header'; // هدر را که قبلا ساختیم ایمپورت میکنیم
import Footer from '@/components/Footer'; // فوتر را ایمپورت میکنیم
import { useParams } from 'next/navigation'; // برای گرفتن ID از آدرس

export default function TourDetailsPage() {
    const params = useParams(); // گرفتن آیدی تور از URL
    const [tour, setTour] = useState(null);
    const [loading, setLoading] = useState(true);

    // آدرس بک‌اند PHP خود را اینجا ست کنید
    const API_URL = "http://localhost/tripjet-backend/tour-details.php";

    useEffect(() => {
        // دریافت اطلاعات تور از بک‌اند
        const fetchTourDetails = async () => {
            try {
                const response = await fetch(`${API_URL}?id=${params.id}`);
                const data = await response.json();
                setTour(data);
            } catch (error) {
                console.error("Error fetching details:", error);
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchTourDetails();
        }
    }, [params.id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">در حال بارگذاری...</div>;
    if (!tour || tour.error) return <div className="min-h-screen flex items-center justify-center">تور مورد نظر یافت نشد.</div>;

    return (
        <div dir="rtl" className="bg-gray-50 font-sans text-gray-800">
            <Header />

            <main className="container mx-auto px-4 py-8">

                {/* === HEADER SECTION: TITLE & BREADCRUMB === */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                    <div className="text-sm text-gray-500 mb-2 md:mb-0">
                        <span>خانه</span> <span className="mx-1">/</span>
                        <span>تورهای خارجی</span> <span className="mx-1">/</span>
                        <span className="text-blue-600 font-bold">{tour.title}</span>
                    </div>
                    <div className="flex gap-2">
                        <button className="text-gray-500 hover:text-red-500"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg></button>
                        <button className="text-gray-500 hover:text-blue-500"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg></button>
                    </div>
                </div>

                {/* === GALLERY SECTION === */}
                <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-3 h-[400px] mb-8 rounded-2xl overflow-hidden">
                    {/* تصویر بزرگ سمت چپ (در RTL راست دیده می‌شود ولی در کد اول می‌آید) */}
                    {/* برای تطابق با عکس شما: عکس بزرگ سمت چپ است و چهار عکس کوچک سمت راست */}
                    {/* اما چون RTL هستیم، Grid را برعکس می‌چینیم یا دستی کنترل می‌کنیم */}
                    <div className="md:col-span-2 md:row-span-2 relative">
                        <img src={tour.gallery[0]} alt="Main" className="w-full h-full object-cover" />
                        <button className="absolute bottom-4 right-4 bg-white/90 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm hover:bg-white">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            تصاویر بیشتر
                        </button>
                    </div>
                    {tour.gallery.slice(1, 5).map((img, index) => (
                        <div key={index} className="hidden md:block">
                            <img src={img} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>

                {/* === MAIN CONTENT LAYOUT === */}
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* --- SIDEBAR (BOOKING FORM) - LEFT SIDE IN DESIGN --- */}
                    <aside className="w-full lg:w-1/3 order-2 lg:order-1">
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sticky top-24">
                            <h3 className="font-bold text-lg mb-2">اطلاعات خود را وارد کنید</h3>
                            <p className="text-gray-500 text-sm mb-6">{tour.title}</p>

                            <div className="space-y-4">
                                <div className="relative">
                                    <label className="text-xs text-gray-400 absolute -top-2 right-3 bg-white px-1">انتخاب تاریخ اجرای تور</label>
                                    <select className="w-full border border-gray-300 rounded-lg px-3 py-3 text-sm focus:outline-blue-500">
                                        <option>۱۸ مهر ۱۴۰۳</option>
                                        <option>۲۵ مهر ۱۴۰۳</option>
                                    </select>
                                </div>

                                <div className="relative">
                                    <label className="text-xs text-gray-400 absolute -top-2 right-3 bg-white px-1">تعداد مسافران</label>
                                    <select className="w-full border border-gray-300 rounded-lg px-3 py-3 text-sm focus:outline-blue-500">
                                        <option>۱ نفر</option>
                                        <option>۲ نفر</option>
                                    </select>
                                </div>

                                <div className="relative">
                                    <label className="text-xs text-gray-400 absolute -top-2 right-3 bg-white px-1">شماره موبایل</label>
                                    <input type="tel" dir="ltr" placeholder="0912..." className="w-full border border-gray-300 rounded-lg px-3 py-3 text-sm text-right focus:outline-blue-500" />
                                </div>
                            </div>

                            <div className="mt-8 pt-4 border-t flex justify-between items-center mb-4">
                                <span className="text-gray-600 text-sm">قیمت برای هر مسافر</span>
                                <div className="flex flex-col items-end">
                                    <span className="font-bold text-blue-600 text-lg">{tour.price} <span className="text-xs text-gray-400">تومان</span></span>
                                    <span className="text-xs text-blue-500">+ ۱۰۰ دلار</span>
                                </div>
                            </div>

                            <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition shadow-blue-200 shadow-lg">
                                رزرو تور
                            </button>
                        </div>
                    </aside>

                    {/* --- INFO CONTENT - RIGHT SIDE IN DESIGN --- */}
                    <div className="w-full lg:w-2/3 order-1 lg:order-2 space-y-8">

                        {/* Title & Dates */}
                        <div className="bg-white rounded-xl border border-gray-100 p-6">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-800 mb-2">{tour.title}</h1>
                                    <span className="text-gray-500 text-sm">مدت سفر: {tour.duration}</span>
                                </div>
                                <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-blue-50">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                                    مشاهده مسیر در نقشه
                                </button>
                            </div>

                            {/* Timeline Grid info */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm text-gray-600 bg-gray-50 p-4 rounded-lg mb-6">
                                <div className="flex flex-col gap-1">
                                    <span className="text-gray-400 text-xs">چهارشنبه</span>
                                    <span className="font-bold text-gray-800">۱۸</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-gray-400 text-xs">پنجشنبه</span>
                                    <span className="font-bold text-gray-800">۱۹</span>
                                </div>
                                <div className="flex flex-col gap-1 border-b-2 border-blue-600 pb-2">
                                    <span className="text-red-500 text-xs">جمعه</span>
                                    <span className="font-bold text-blue-600">۲۰</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-gray-400 text-xs">شنبه</span>
                                    <span className="font-bold text-gray-800">۲۱</span>
                                </div>
                            </div>

                            {/* Detailed Info List */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                                <div className="flex justify-between border-b border-dashed pb-2">
                                    <span className="text-gray-500 flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        تاریخ رفت
                                    </span>
                                    <span className="font-medium">{tour.info.start_date}</span>
                                </div>
                                <div className="flex justify-between border-b border-dashed pb-2">
                                    <span className="text-gray-500 flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        تاریخ برگشت
                                    </span>
                                    <span className="font-medium">{tour.info.end_date}</span>
                                </div>
                                <div className="flex justify-between border-b border-dashed pb-2">
                                    <span className="text-gray-500 flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                                        محل اقامت
                                    </span>
                                    <span className="font-medium">{tour.info.accommodation}</span>
                                </div>
                                <div className="flex justify-between border-b border-dashed pb-2">
                                    <span className="text-gray-500 flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>
                                        محل حرکت
                                    </span>
                                    <span className="font-medium">فرودگاه بین‌المللی امام خمینی</span>
                                </div>
                                <div className="flex justify-between border-b border-dashed pb-2">
                                    <span className="text-gray-500 flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                        وسیله نقلیه
                                    </span>
                                    <span className="font-medium">{tour.info.transport}</span>
                                </div>
                                <div className="flex justify-between border-b border-dashed pb-2">
                                    <span className="text-gray-500 flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                        وعده غذایی
                                    </span>
                                    <span className="font-medium">{tour.info.meals}</span>
                                </div>
                            </div>
                        </div>

                        {/* Itinerary (برنامه تور) */}
                        <div className="bg-white rounded-xl border border-gray-100 p-6">
                            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                                برنامه تور
                            </h3>

                            <div className="space-y-6 relative border-r-2 border-gray-100 pr-6 mr-3">
                                {tour.itinerary.map((day, idx) => (
                                    <div key={idx} className="relative">
                                        {/* دایره آبی روی خط زمان */}
                                        <div className="absolute -right-[31px] top-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold ring-4 ring-white">
                                            {day.day}
                                        </div>

                                        <div className="bg-white border rounded-lg overflow-hidden flex flex-col md:flex-row shadow-sm hover:shadow-md transition">
                                            <div className="w-full md:w-48 h-40 shrink-0">
                                                <img src={day.image} alt={`Day ${day.day}`} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="p-4 flex flex-col justify-center">
                                                <h4 className="font-bold text-gray-700 text-sm mb-2">{day.date}</h4>
                                                <p className="text-sm text-gray-500 leading-6 text-justify pl-2">
                                                    {day.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Supplies & Services (لوازم و خدمات) */}
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                            <div className="bg-white rounded-xl border border-gray-100 p-6">
                                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                                    لوازم مورد نیاز
                                </h3>
                                <ul className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {tour.supplies.map((item, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-white rounded-xl border border-gray-100 p-6">
                                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                                    خدمات تور
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {tour.services.map((item, i) => (
                                        <span key={i} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium border border-blue-100">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Reviews (نظرات) */}
                        <div className="bg-white rounded-xl border border-gray-100 p-6">
                            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>
                                نظرات کاربران
                            </h3>

                            <div className="space-y-4">
                                {tour.reviews.map((review, i) => (
                                    <div key={i} className="bg-gray-50 rounded-xl p-4 flex gap-4">
                                        <div className="w-12 h-12 bg-gray-300 rounded-full shrink-0 overflow-hidden">
                                            <img src={`https://i.pravatar.cc/150?u=${i}`} alt={review.user} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-bold text-sm">{review.user}</span>
                                                <div className="text-yellow-400 text-xs flex">
                                                    {'★'.repeat(review.rating)}
                                                    <span className="text-gray-300">{'★'.repeat(5 - review.rating)}</span>
                                                </div>
                                            </div>
                                            <span className="text-xs text-gray-400 block mb-2">{review.date}</span>
                                            <p className="text-sm text-gray-600 leading-6 text-justify">{review.comment}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}