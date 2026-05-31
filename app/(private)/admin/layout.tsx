"use client";

import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import {
  MdDashboard,
  MdArticle,
  MdInventory,
  MdLogout,
} from "react-icons/md";
import { Info } from "lucide-react";
import { FaQ } from "react-icons/fa6";

const navItems = [
  { href: "/admin", label: "داشبورد", icon: MdDashboard, exact: true },
  { href: "/admin/blog", label: "مدیریت بلاگ", icon: MdArticle },
  { href: "/admin/products", label: "مدیریت محصولات", icon: MdInventory },
  { href: "/admin/info", label: "مشخصات سایت", icon: Info },
  { href: "/admin/faq", label: "مدریت سوال و جواب ها", icon: FaQ },
  { href: "/admin/slider", label: "مدریت اسلایدر", icon: FaQ },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <div className="min-h-screen dashboard-page bg-gray-950 text-white flex dashboard-page" dir="rtl">
      <aside className="w-64 bg-gray-900 border-l border-white/10 flex flex-col fixed h-full right-0">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div>
              <p className="text-sm font-bold tracking-widest">پنل مدیریت بارش</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ href, label, icon: Icon, exact }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all ${isActive(href, exact)
                ? "bg-white/10 text-white font-medium"
                : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <button onClick={() => redirect('/')} title="هدایت به صفحه اصلی" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-white/50 hover:text-red-400 hover:bg-red-400/10 cursor-pointer transition-all w-full">
            <MdLogout size={18} />
            خروج از حساب
          </button>
        </div>
      </aside>

      <div className="flex-1 mr-64 p-8 overflow-auto">{children}</div>
    </div>
  );
}