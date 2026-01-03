"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProfilePage() {
    const router = useRouter();

    // --- States ---
    const [activeTab, setActiveTab] = useState('profile'); // profile, edit, trips, trip-details, auto-book, wishlist, transactions
    const [userData, setUserData] = useState(null);
    const [trips, setTrips] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [selectedTrip, setSelectedTrip] = useState(null); // برای نمایش جزئیات سفر
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [loading, setLoading] = useState(true);

    const API_BASE = "http://localhost/tripjet-backend/profile.php";

    // --- Fetch Data ---
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [userRes, tripsRes, wishRes, transRes] = await Promise.all([
                fetch(`${API_BASE}?action=info`),
                fetch(`${API_BASE}?action=trips`),
                fetch(`${API_BASE}?action=wishlist`),
                fetch(`${API_BASE}?action=transactions`)
            ]);

            setUserData(await userRes.json());
            setTrips(await tripsRes.json());
            setWishlist(await wishRes.json());
            setTransactions(await transRes.json());
            setLoading(false);
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    };

    // --- Handlers ---
    const handleViewTrip = (trip) => {
        setSelectedTrip(trip);
        setActiveTab('trip-details');
    }

    const handleLogout = () => {
        // اینجا توکن‌ها پاک می‌شوند
        router.push('/');
    }

    // --- Sub-Components (Views) ---

    // 1. Profile Summary View (تصویر اول)
    const ProfileView = () => (
        <div className="space-y-6">
            {/* اطلاعات کاربری */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-700">اطلاعات کاربری</h3>
                    <button onClick={() => setActiveTab('edit')} className="text-blue-600 text-sm flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                        ویرایش اطلاعات
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div className="flex justify-between border-b border-dashed pb-2">
                        <span className="text-gray-500">نام و نام خانوادگی</span>
                        <span className="font-medium">{userData.name}</span>
                    </div>
                    <div className="flex justify-between border-b border-dashed pb-2">
                        <span className="text-gray-500">موجودی حساب کاربری</span>
                        <span className="font-medium text-blue-600 dir-ltr">{userData.wallet} ریال</span>
                    </div>
                </div>
            </div>

            {/* اطلاعات مسافرتی */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-700">اطلاعات مسافرتی</h3>
                    <button onClick={() => setActiveTab('edit')} className="text-blue-600 text-sm flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                        ویرایش اطلاعات
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div className="flex justify-between border-b border-dashed pb-2">
                        <span className="text-gray-500">تاریخ تولد</span>
                        <span className="font-medium">{userData.birth_date}</span>
                    </div>
                    <div className="flex justify-between border-b border-dashed pb-2">
                        <span className="text-gray-500">کد ملی</span>
                        <span className="font-medium">{userData.national_code}</span>
                    </div>
                    <div className="flex justify-between border-b border-dashed pb-2">
                        <span className="text-gray-500">شماره پاسپورت</span>
                        <span className="font-medium">{userData.passport_id}</span>
                    </div>
                    <div className="flex justify-between border-b border-dashed pb-2">
                        <span className="text-gray-500">تاریخ انقضای پاسپورت</span>
                        <span className="font-medium">{userData.passport_expire}</span>
                    </div>
                </div>
            </div>

            {/* اطلاعات تماس */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-700">اطلاعات تماس</h3>
                    <button onClick={() => setActiveTab('edit')} className="text-blue-600 text-sm flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                        ویرایش اطلاعات
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div className="flex justify-between border-b border-dashed pb-2">
                        <span className="text-gray-500">شماره موبایل</span>
                        <span className="font-medium">{userData.phone}</span>
                    </div>
                    <div className="flex justify-between border-b border-dashed pb-2">
                        <span className="text-gray-500">تلفن ثابت</span>
                        <span className="font-medium">-</span>
                    </div>
                </div>
            </div>

            {/* اطلاعات بانکی */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-700">اطلاعات بانکی</h3>
                    <button onClick={() => setActiveTab('edit')} className="text-blue-600 text-sm flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                        ویرایش اطلاعات
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div className="flex justify-between border-b border-dashed pb-2">
                        <span className="text-gray-500">شماره کارت</span>
                        <span className="font-medium">{userData.card_number || '-'}</span>
                    </div>
                    <div className="flex justify-between border-b border-dashed pb-2">
                        <span className="text-gray-500">شماره شبا</span>
                        <span className="font-medium">{userData.sheba_number || '-'}</span>
                    </div>
                </div>
            </div>
        </div>
    );

    // 2. Edit Profile View (تصویر دوم)
    const EditView = () => (
        <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h3 className="font-bold text-gray-700 mb-6">اطلاعات کاربری</h3>

                <div className="mb-4 flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="gender" defaultChecked /> مذکر</label>
                    <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="gender" /> مونث</label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">نام به فارسی</label>
                        <input type="text" defaultValue="کوروش" className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-blue-500" />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">نام خانوادگی به فارسی</label>
                        <input type="text" defaultValue="صفایی" className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-blue-500" />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">نام به انگلیسی</label>
                        <input type="text" defaultValue="Kourosh" className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-blue-500 text-left" dir="ltr" />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">نام خانوادگی به انگلیسی</label>
                        <input type="text" defaultValue="Safayi" className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-blue-500 text-left" dir="ltr" />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h3 className="font-bold text-gray-700 mb-6">اطلاعات مسافرتی</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">تاریخ تولد</label>
                        <div className="flex gap-2">
                            <select className="border rounded-lg px-2 py-2 w-1/3"><option>۰۱</option></select>
                            <select className="border rounded-lg px-2 py-2 w-1/3"><option>۱۱</option></select>
                            <select className="border rounded-lg px-2 py-2 w-1/3"><option>۱۳۶۴</option></select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">شماره ملی</label>
                        <input type="text" defaultValue={userData.national_code} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-blue-500 text-left" dir="ltr" />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">تاریخ انقضای پاسپورت</label>
                        <div className="flex gap-2">
                            <select className="border rounded-lg px-2 py-2 w-1/3"><option>روز</option></select>
                            <select className="border rounded-lg px-2 py-2 w-1/3"><option>ماه</option></select>
                            <select className="border rounded-lg px-2 py-2 w-1/3"><option>سال</option></select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">شماره پاسپورت</label>
                        <input type="text" defaultValue={userData.passport_id} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-blue-500 text-left" dir="ltr" />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h3 className="font-bold text-gray-700 mb-6">اطلاعات بانکی</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">شماره شبا</label>
                        <input type="text" placeholder="IR..." className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-blue-500 text-left" dir="ltr" />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">شماره کارت</label>
                        <input type="text" className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-blue-500 text-left" dir="ltr" />
                    </div>
                </div>
            </div>

            <div className="flex gap-4">
                <button onClick={() => setActiveTab('profile')} className="bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-700">ذخیره</button>
                <button onClick={() => setActiveTab('profile')} className="border border-gray-300 text-gray-600 px-8 py-2 rounded-lg hover:bg-gray-50">انصراف</button>
            </div>
        </div>
    );

    // 3. My Trips View (تصویر سوم سمت چپ)
    const MyTripsView = () => (
        <div className="space-y-6">
            <h3 className="font-bold text-gray-700">تورهای رزرو شده</h3>
            {trips.map((trip) => (
                <div key={trip.id} className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col md:flex-row items-center gap-4">
                    <img src={trip.image} alt={trip.title} className="w-20 h-20 rounded-lg object-cover" />
                    <div className="flex-grow grid grid-cols-2 md:grid-cols-4 gap-4 w-full text-center md:text-right text-sm items-center">
                        <div>
                            <span className="font-bold block mb-1">{trip.title}</span>
                            <span className="text-gray-400 text-xs">کد پیگیری: {trip.code}</span>
                        </div>
                        <div>
                            <span className="text-gray-500 block mb-1">مبلغ پرداختی</span>
                            <span className="font-medium text-blue-600">{trip.price} ریال</span>
                        </div>
                        <div>
                            <span className={`inline-block px-3 py-1 rounded-full text-xs ${trip.status_color === 'green' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {trip.status}
                            </span>
                        </div>
                        <div className="text-left">
                            <button onClick={() => handleViewTrip(trip)} className="text-blue-600 flex items-center gap-1 justify-end hover:underline">
                                مشاهده جزئیات
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    // 4. Trip Details View (تصویر سوم سمت راست)
    const TripDetailsView = () => (
        <div className="space-y-6">
            <button onClick={() => setActiveTab('trips')} className="text-gray-500 flex items-center gap-1 mb-4 text-sm hover:text-black">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                بازگشت به سفرها
            </button>

            <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h3 className="font-bold text-gray-700 mb-4">{selectedTrip.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-500">کد رهگیری</span>
                        <span className="font-medium">{selectedTrip.code}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">زمان خرید</span>
                        <span className="font-medium">{selectedTrip.purchase_date}</span>
                    </div>
                    <div className="md:col-span-2">
                        <button className="bg-blue-600 text-white w-full py-2 rounded-lg text-sm">دانلود ووچر</button>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h3 className="font-bold text-gray-700 mb-4">اطلاعات تور</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-500">زمان رفت</span>
                        <span className="font-medium">{selectedTrip.date}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">زمان برگشت</span>
                        <span className="font-medium">۱۴۰۳/۰۸/۱۰</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500">مبلغ پرداختی</span>
                        <span className="font-bold text-lg text-blue-600">{selectedTrip.price}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500">وضعیت</span>
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">پرداخت موفق</span>
                    </div>
                </div>
                <div className="mt-6 flex gap-4">
                    <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg text-sm w-1/2">درخواست ویرایش</button>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm w-1/2">استعلام جریمه و استرداد</button>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h3 className="font-bold text-gray-700 mb-4">مشخصات مسافران</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-right">
                        <thead className="text-gray-500 bg-gray-50">
                            <tr>
                                <th className="p-3 rounded-r-lg">نام مسافر</th>
                                <th className="p-3">نوع مسافر</th>
                                <th className="p-3">تاریخ تولد</th>
                                <th className="p-3 rounded-l-lg">جنسیت</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            <tr>
                                <td className="p-3 font-medium">کوروش صفایی</td>
                                <td className="p-3">بزرگسال</td>
                                <td className="p-3">۱۳۶۴/۱۱/۰۱</td>
                                <td className="p-3">مذکر</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-medium">علی بهرامی</td>
                                <td className="p-3">بزرگسال</td>
                                <td className="p-3">۱۳۷۰/۰۵/۲۰</td>
                                <td className="p-3">مذکر</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    // 5. Auto Booking View (تصویر چهارم سمت چپ)
    const AutoBookView = () => (
        <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-gray-700">مدیریت رزرو خودکار</h3>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
            </div>

            <div className="bg-blue-50 text-blue-800 p-4 rounded-lg text-sm leading-6">
                <p>رزرو خودکار تا یک ساعت پیش از حرکت فعال است. در صورت موجود بودن ظرفیت، رزرو به صورت کامل انجام می‌شود.</p>
                <p className="mt-2">این پیش رزرو منوط بر پرداخت نیست.</p>
            </div>

            <div className="flex justify-between items-center border-t pt-4">
                <span className="text-sm text-gray-600">اعتبار کاربری</span>
                <span className="font-bold">۲۰,۰۰۰,۰۰۰ ریال</span>
            </div>
        </div>
    );

    // 6. Wishlist View (تصویر چهارم سمت راست)
    const WishlistView = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border">
                <h3 className="font-bold text-gray-700">تورهایی که ذخیره کرده‌اید</h3>
                <div className="flex gap-2">
                    <button className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">تورهای داخلی</button>
                    <button className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">تورهای خارجی</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {wishlist.map((item) => (
                    <div key={item.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition">
                        <div className="relative h-40">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                            <button className="absolute top-2 right-2 text-red-500 bg-white p-1 rounded-full shadow"><svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg></button>
                            <span className="absolute bottom-2 right-2 bg-yellow-400 text-xs px-2 py-1 rounded">{item.duration}</span>
                        </div>
                        <div className="p-4">
                            <h4 className="font-bold text-gray-800 mb-2">{item.title}</h4>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">{item.date}</span>
                            </div>
                            <div className="flex justify-between items-center mt-3">
                                <span className="text-blue-600 font-bold">{item.price} ریال</span>
                                <button className="bg-blue-600 text-white px-4 py-1.5 rounded text-xs">رزرو تور</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    // 7. Transactions View (تصویر پنجم)
    const TransactionsView = () => (
        <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="font-bold text-gray-700 mb-6">تاریخچه تراکنش‌ها</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b text-gray-500">
                            <th className="pb-3 text-right">نوع تراکنش</th>
                            <th className="pb-3 text-right">مبلغ</th>
                            <th className="pb-3 text-right">شناسه تراکنش</th>
                            <th className="pb-3 text-right">زمان تراکنش</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {transactions.map((tr, idx) => (
                            <tr key={idx}>
                                <td className="py-4">{tr.type}</td>
                                <td className={`py-4 dir-ltr text-right ${tr.amount.includes('+') ? 'text-green-600' : 'text-red-600'}`}>{tr.amount}</td>
                                <td className="py-4">{tr.id}</td>
                                <td className="py-4">{tr.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );


    if (loading) return <div className="min-h-screen flex items-center justify-center">در حال بارگذاری اطلاعات...</div>;

    return (
        <div dir="rtl" className="bg-gray-50 font-sans text-gray-800 min-h-screen">
            <Header />

            <main className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* --- SIDEBAR --- */}
                    <aside className="w-full lg:w-1/4">
                        <div className="bg-white rounded-xl border border-gray-100 p-6 sticky top-24">
                            {/* User Info Header in Sidebar */}
                            <div className="flex items-center gap-4 mb-6 border-b pb-6">
                                <img src={userData.avatar} alt="Profile" className="w-14 h-14 rounded-full border-2 border-blue-100" />
                                <div>
                                    <h3 className="font-bold text-sm">{userData.name}</h3>
                                    <span className="text-xs text-gray-400 mt-1 block">{userData.phone}</span>
                                </div>
                                <button className="mr-auto text-blue-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
                            </div>

                            {/* Wallet */}
                            <div className="bg-blue-50 rounded-lg p-3 flex justify-between items-center mb-6">
                                <span className="text-xs text-blue-800">کیف پول</span>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-blue-600 text-sm">{userData.wallet}</span>
                                    <button className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">+</button>
                                </div>
                            </div>

                            {/* Menu */}
                            <nav className="space-y-1">
                                {[
                                    { id: 'profile', label: 'حساب کاربری', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
                                    { id: 'settings', label: 'تنظیمات حساب', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
                                    { id: 'trips', label: 'سفرهای من', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
                                    { id: 'auto-book', label: 'مدیریت رزرو خودکار', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
                                    { id: 'wishlist', label: 'علاقه مندی ها', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
                                    { id: 'transactions', label: 'تراکنش ها', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
                                ].map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`w-full text-right flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition ${activeTab === item.id || (activeTab === 'edit' && item.id === 'profile') || (activeTab === 'trip-details' && item.id === 'trips') ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
                                        {item.label}
                                        {(activeTab === item.id || (activeTab === 'edit' && item.id === 'profile')) && <span className="mr-auto text-blue-600">‹</span>}
                                    </button>
                                ))}
                            </nav>

                            {/* Logout Button */}
                            <button
                                onClick={() => setShowLogoutModal(true)}
                                className="w-full text-right flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-red-500 hover:bg-red-50 mt-6 bg-red-50/50"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                خروج از حساب کاربری
                            </button>
                        </div>
                    </aside>

                    {/* --- CONTENT AREA --- */}
                    <div className="w-full lg:w-3/4">
                        {activeTab === 'profile' && <ProfileView />}
                        {activeTab === 'edit' && <EditView />}
                        {activeTab === 'trips' && <MyTripsView />}
                        {activeTab === 'trip-details' && selectedTrip && <TripDetailsView />}
                        {activeTab === 'auto-book' && <AutoBookView />}
                        {activeTab === 'wishlist' && <WishlistView />}
                        {activeTab === 'transactions' && <TransactionsView />}
                        {activeTab === 'settings' && <div className="text-center py-10 text-gray-400">تنظیمات در دسترس نیست</div>}
                    </div>

                </div>
            </main>

            {/* --- LOGOUT MODAL --- */}
            {showLogoutModal && (
                <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl p-8 w-full max-w-md text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                        </div>
                        <h3 className="text-lg font-bold mb-2">خروج از حساب کاربری</h3>
                        <p className="text-gray-500 text-sm mb-8">آیا مایل هستید از حساب کاربری خود خارج شوید؟</p>
                        <div className="flex gap-4">
                            <button onClick={handleLogout} className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition">خروج</button>
                            <button onClick={() => setShowLogoutModal(false)} className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition">انصراف</button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}