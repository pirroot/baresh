import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password } = body ?? {};

    if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_COOKIE_NAME) {
      console.error('[POST /api/auth] متغیرهای محیطی تنظیم نشده‌اند.');
      return NextResponse.json(
        { error: 'خطای پیکربندی سرور.' },
        { status: 500 }
      );
    }

    if (!password || typeof password !== 'string') {
      return NextResponse.json(
        { error: 'رمز عبور ارسال نشده است.' },
        { status: 400 }
      );
    }

    if (password !== process.env.ADMIN_PASSWORD) {
      await new Promise((r) => setTimeout(r, 500));
      return NextResponse.json(
        { error: 'رمز عبور اشتباه است.' },
        { status: 401 }
      );
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
  } catch (error) {
    console.error('[POST /api/auth]', error);
    return NextResponse.json(
      { error: 'خطایی در سرور رخ داد.' },
      { status: 500 }
    );
  }
}
