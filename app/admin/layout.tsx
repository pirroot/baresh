"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdDashboard,
  MdArticle,
  MdInventory,
  MdSettings,
  MdLogout,
} from "react-icons/md";
import "./admin.css"

const navItems = [
  { href: "/admin", label: "داشبورد", icon: MdDashboard, exact: true },
  { href: "/admin/blog", label: "مدیریت بلاگ", icon: MdArticle },
  { href: "/admin/products", label: "مدیریت محصولات", icon: MdInventory },
  { href: "/admin/settings", label: "تنظیمات", icon: MdSettings },
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
    <div className="min-h-screen bg-gray-950 text-white flex" dir="rtl">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 border-l border-white/10 flex flex-col fixed h-full right-0">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center">
              <span className="text-xs font-bold">B</span>
            </div>
            <div>
              <p className="text-sm font-bold tracking-widest">BARSH</p>
              <p className="text-xs text-white/40">پنل مدیریت</p>
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
          <button className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-white/50 hover:text-red-400 hover:bg-red-400/10 transition-all w-full">
            <MdLogout size={18} />
            خروج از حساب
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 mr-64 p-8 overflow-auto">{children}</div>
    </div>
  );
}