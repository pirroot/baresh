import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_COOKIE_NAME) {
    return NextResponse.json(
      { error: 'server misconfiguration' },
      { status: 500 }
    );
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    await new Promise((r) => setTimeout(r, 500)); // brute-force delay
    return NextResponse.json({ error: 'رمز اشتباهه' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(process.env.ADMIN_COOKIE_NAME, '1', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24,
  });
  return res;
}
