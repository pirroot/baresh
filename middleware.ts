import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const cookie = req.cookies.get(process.env.ADMIN_COOKIE_NAME!);
  const isLoginPage = req.nextUrl.pathname === '/admin/login';

  if (!cookie && !isLoginPage) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  if (cookie && isLoginPage) {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
