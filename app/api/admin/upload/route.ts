// app/api/admin/upload/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const MAX_IMAGE_MB = 5;
const MAX_PDF_MB = 20;
const ALLOWED_IMAGE = ['image/jpeg', 'image/png', 'image/webp'];
const ALLOWED_PDF = ['application/pdf'];

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const type = formData.get('type') as 'image' | 'pdf' | null; // باید از کلاینت بیاد

    if (!file || !type) {
      return NextResponse.json(
        { error: 'فایل یا نوع مشخص نشده' },
        { status: 400 }
      );
    }

    // validation نوع فایل
    const allowed = type === 'pdf' ? ALLOWED_PDF : ALLOWED_IMAGE;
    if (!allowed.includes(file.type)) {
      return NextResponse.json(
        { error: `فرمت مجاز نیست. فرمت‌های قابل قبول: ${allowed.join(', ')}` },
        { status: 400 }
      );
    }

    // validation حجم
    const maxBytes = (type === 'pdf' ? MAX_PDF_MB : MAX_IMAGE_MB) * 1024 * 1024;
    if (file.size > maxBytes) {
      return NextResponse.json(
        {
          error: `حجم فایل بیشتر از ${type === 'pdf' ? MAX_PDF_MB : MAX_IMAGE_MB}MB است`,
        },
        { status: 400 }
      );
    }

    // ساخت پوشه
    const folder = type === 'pdf' ? 'catalogs' : 'products';
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder);
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // نام یکتا برای فایل
    const ext = path.extname(file.name).toLowerCase();
    const baseName = path
      .basename(file.name, ext)
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .slice(0, 40);
    const fileName = `${baseName}-${Date.now()}${ext}`;
    const filePath = path.join(uploadDir, fileName);
    const publicUrl = `/uploads/${folder}/${fileName}`;

    // نوشتن فایل
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    return NextResponse.json({ url: publicUrl });
  } catch (err) {
    console.error('[UPLOAD]', err);
    return NextResponse.json({ error: 'خطا در آپلود فایل' }, { status: 500 });
  }
}
