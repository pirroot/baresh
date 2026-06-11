import Link from "next/link";
import { FaInstagram, FaTelegram, FaGlobe } from "react-icons/fa6";
import type { IconType } from "react-icons";
import { getHomeDataApi } from "@/services/homeServices";
import Image from "next/image";
import balesvg from '@/public/images/bale-border.svg'

type SocialItem = {
  icon: IconType | null;
  customIcon?: React.ReactNode;
  label: string;
  handle: string;
  href: string;
  glowColor: string;
  iconHover: string;
  dotHover: string;
};

const Socials = async () => {
  const { siteInfo } = await getHomeDataApi();

  const socials: SocialItem[] = [
    siteInfo?.instagram
      ? {
        icon: FaInstagram,
        label: "اینستاگرام",
        handle: `@${siteInfo.instagram}`,
        href: `https://instagram.com/${siteInfo.instagram}`,
        glowColor: "before:from-red-500/20",
        iconHover: "group-hover:bg-red-500/20 group-hover:text-red-300",
        dotHover: "group-hover:bg-red-400/70",
      }
      : null,

    siteInfo?.telegram
      ? {
        icon: FaTelegram,
        label: "تلگرام",
        handle: `@${siteInfo.telegram}`,
        href: `https://t.me/${siteInfo.telegram}`,
        glowColor: "before:from-sky-500/20",
        iconHover: "group-hover:bg-sky-500/20 group-hover:text-sky-300",
        dotHover: "group-hover:bg-sky-400/70",
      }
      : null,

    siteInfo?.bale
      ? {
        icon: null,
        customIcon: (
          <Image src={balesvg} alt="بله" width={20} height={20} />
        ),
        label: "بله",
        handle: `@${siteInfo.bale}`,
        href: `https://web.bale.ai/@${siteInfo.bale}`,
        glowColor: "before:from-green-500/20",
        iconHover: "group-hover:bg-green-500/20 group-hover:text-green-300",
        dotHover: "group-hover:bg-green-400/70",
      }
      : null,

    siteInfo?.shopUrl
      ? {
        icon: FaGlobe,
        label: "سایت فروشگاهی",
        handle: siteInfo.shopUrl,
        href: siteInfo.shopUrl,
        glowColor: "before:from-violet-500/20",
        iconHover: "group-hover:bg-violet-500/20 group-hover:text-violet-300",
        dotHover: "group-hover:bg-violet-400/70",
      }
      : null,
  ].filter(Boolean) as SocialItem[];

  if (!socials.length) return null;

  return (
    <section className="border border-sky-500/15 rounded-2xl bg-sky-500/5 backdrop-blur-sm px-8 py-7">
      <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-sky-400 bg-sky-500/10 border border-sky-500/20 px-4 py-1.5 rounded-full mb-3">
        شبکه‌های اجتماعی
      </span>

      <h2 className="text-base font-medium text-white/90">ما را دنبال کنید</h2>

      <div className="mt-3 mb-6 h-px w-8 bg-sky-500/40" />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {socials.map(({ icon: Icon, customIcon, label, handle, href, glowColor, iconHover, dotHover }) => (
          <Link
            key={`${label}-${href}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={`
              group relative flex flex-col items-center gap-2.5 overflow-hidden
              rounded-[14px] border border-sky-500/15 bg-sky-500/5
              px-4 py-5 text-center
              transition-all duration-300
              hover:-translate-y-1 hover:border-sky-500/30

              before:absolute before:inset-0 before:rounded-[14px]
              before:bg-lidaer-to-br before:to-transparent
              before:opacity-0 before:transition-opacity before:duration-300
              hover:before:opacity-100
              ${glowColor}
            `}
          >
            <span
              className={`absolute bottom-2.5 end-2.5 h-1.5 w-1.5 rounded-full bg-sky-500/20 transition-colors duration-300 ${dotHover}`}
            />

            <div
              className={`
                relative z-10 flex h-11 w-11 items-center justify-center
                rounded-xl bg-sky-500/10 transition-colors duration-300
                ${iconHover}
              `}
            >
              {customIcon
                ? customIcon
                : Icon && <Icon className="h-5 w-5 text-white/65 transition-colors duration-300" />
              }
            </div>

            <div className="relative z-10">
              <p className="text-[13px] font-medium text-white/85">{label}</p>
              <p className="dir-ltr mt-0.5 text-[11px] text-sky-400/50">{handle}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Socials;