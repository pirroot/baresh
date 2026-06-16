"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  MdDashboard,
  MdArticle,
  MdInventory,
  MdLogout,
  MdComment,
} from "react-icons/md";
import { Info } from "lucide-react";
import { FaQ } from "react-icons/fa6";

const navItems = [
  { href: "/admin", label: "داشبورد", icon: MdDashboard, exact: true },
  { href: "/admin/blog", label: "مدیریت بلاگ", icon: MdArticle },
  { href: "/admin/products", label: "مدیریت محصولات", icon: MdInventory },
  { href: "/admin/products/comments", label: "مدیریت کامنت محصولات", icon: MdComment },
  { href: "/admin/info", label: "مشخصات سایت", icon: Info },
  { href: "/admin/faq", label: "مدیریت سوال و جواب‌ها", icon: FaQ },
  { href: "/admin/slider", label: "مدیریت اسلایدر", icon: FaQ },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <div
      className="min-h-screen flex bg-[#e7e7e7] text-slate-800"
      dir="rtl"
    >
      <aside className="fixed right-0 top-0 h-screen w-72 bg-white/50 backdrop-blur-sm border-l border-slate-200 shadow-sm flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-100">
          <Link href={'/'} className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-linear-to-br from-sky-500 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md">
              ب
            </div>
            <div>
              <p className="text-sm text-slate-500">مدیریت</p>
              <h2 className="text-base font-bold text-slate-800">
                پنل بارش
              </h2>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map(({ href, label, icon: Icon, exact }) => {
            const active = isActive(href, exact);

            return (
              <Link
                key={href}
                href={href}
                className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition-all duration-200 ${active
                  ? "bg-linear-to-l from-sky-500 to-indigo-500 text-white shadow-md"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
              >
                <span
                  className={`transition-transform duration-200 ${active ? "scale-110" : "group-hover:scale-105"
                    }`}
                >
                  <Icon size={18} />
                </span>
                <span className="font-medium">{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer / Logout */}
        <div className="p-4 border-t border-slate-100">
          <button
            onClick={() => router.push("/")} title="هدایت به صفحه اصلی"
            className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all duration-200 cursor-pointer"
          >
            <MdLogout size={18} />
            <span className="font-medium">خروج از حساب</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 mr-72 p-8">
        <div className="min-h-[calc(100vh-4rem)] rounded-3xl border border-slate-200 bg-white shadow-sm p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
