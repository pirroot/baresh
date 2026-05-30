'use client'

import React, { useState } from 'react';
import { Save, Image as ImageIcon, Globe, Phone, MapPin, Send, ShoppingCart, Award, Package, Users, FileText } from 'lucide-react';
import { BsInstagram } from 'react-icons/bs';

const AdminInfoForm = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex" dir="rtl">
      <main className="flex-1 mr-64 p-8">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-100">تنظیمات اطلاعات پایه</h1>
            <p className="text-gray-400 text-sm mt-1">مدیریت محتوای اصلی سایت و شبکه‌های اجتماعی</p>
          </div>
          <button
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-700 transition-colors px-6 py-2 rounded-xl font-medium"
            type="submit"
            form="info-form"
          >
            <Save size={18} />
            ذخیره تغییرات
          </button>
        </header>

        <form id="info-form" className="space-y-6 max-w-5xl">

          <section className="bg-gray-800 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2 text-blue-400">
              <Phone size={20} /> ارتباطات پایه
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-400 mr-1">شماره تماس مستقیم</label>
                <input
                  type="text"
                  placeholder="021-XXXXXXXX"
                  className="w-full bg-gray-950 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-all text-left"
                  dir="ltr"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400 mr-1">آدرس کارخانه</label>
                <div className="relative">
                  <MapPin className="absolute right-3 top-3.5 text-gray-500" size={18} />
                  <input
                    type="text"
                    placeholder="استان، شهر، شهرک صنعتی..."
                    className="w-full bg-gray-950 border border-white/10 rounded-xl pr-10 pl-4 py-3 outline-none focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="bg-gray-800 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2 text-pink-400">
              <Globe size={20} /> لینک‌های خارجی و سوشال
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-gray-500 mr-1">اینستاگرام</label>
                <div className="relative">
                  <BsInstagram className="absolute right-3 top-3 text-gray-500" size={16} />
                  <input type="text" placeholder="ID" className="w-full bg-gray-950 border border-white/10 rounded-lg pr-9 pl-3 py-2 text-sm outline-none focus:border-pink-500" dir="ltr" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-gray-500 mr-1">تلگرام</label>
                <div className="relative">
                  <Send className="absolute right-3 top-3 text-gray-500" size={16} />
                  <input type="text" placeholder="@username" className="w-full bg-gray-950 border border-white/10 rounded-lg pr-9 pl-3 py-2 text-sm outline-none focus:border-blue-400" dir="ltr" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-gray-500 mr-1">بله (ایرانی)</label>
                <input type="text" placeholder="ID Bale" className="w-full bg-gray-950 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-orange-500" dir="ltr" />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-gray-500 mr-1">لینک فروشگاه</label>
                <div className="relative">
                  <ShoppingCart className="absolute right-3 top-3 text-gray-500" size={16} />
                  <input type="url" placeholder="https://shop.ir" className="w-full bg-gray-950 border border-white/10 rounded-lg pr-9 pl-3 py-2 text-sm outline-none focus:border-green-500" dir="ltr" />
                </div>
              </div>
            </div>
          </section>

          <section className="bg-gray-800 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2 text-yellow-500">
              <Award size={20} /> شاخص‌های عملکرد (Stats)
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'سال سابقه', icon: <Award />, color: 'text-yellow-500' },
                { label: 'محصول تحویلی', icon: <Package />, color: 'text-blue-500' },
                { label: 'مشتری اعتماد کرده', icon: <Users />, color: 'text-green-500' },
                { label: 'کشور تحت پوشش', icon: <Globe />, color: 'text-purple-500' }
              ].map((stat, idx) => (
                <div key={idx} className="space-y-2">
                  <label className="text-xs text-gray-400 flex items-center gap-1">
                    {stat.label}
                  </label>
                  <input
                    type="number"
                    className="w-full bg-gray-950 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 bg-gray-800 border border-white/10 rounded-2xl p-6 flex flex-col justify-center items-center">
              <label className="text-sm text-gray-400 mb-4 block w-full text-right">تصویر درباره ما</label>
              <div className="w-full aspect-square bg-gray-950 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500/50 transition-colors group">
                <ImageIcon className="text-gray-600 group-hover:text-blue-500 mb-2" size={40} />
                <span className="text-xs text-gray-500">کلیک برای آپلود تصویر</span>
                <input type="file" className="hidden" accept="image/*" />
              </div>
            </div>

            {/* متون درباره ما */}
            <div className="lg:col-span-2 bg-gray-800 border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">عنوان درباره ما (Title)</label>
                <input type="text" className="w-full bg-gray-950 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-blue-500" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">متن درباره ما</label>
                <textarea rows={4} className="w-full bg-gray-950 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-blue-500 resize-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400 flex items-center gap-2">
                  <FileText size={16} className="text-blue-400" /> متن صفحه اصلی (Hero Section)
                </label>
                <textarea rows={3} className="w-full bg-gray-950 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-blue-500 resize-none" />
              </div>
            </div>
          </section>
          <button
            type="submit"
            className="border-2 border-white/10 bg-blue-700 hover:bg-blue-600 active:bg-blue-800 px-10 py-4 rounded-xl font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/60"
          >
            ذخیره
          </button>
        </form>
      </main>
    </div>
  );
};

export default AdminInfoForm;
