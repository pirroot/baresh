import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'رمز اشتباهه' }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(process.env.ADMIN_COOKIE_NAME!, '1', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24,
  });
  return res;
}
