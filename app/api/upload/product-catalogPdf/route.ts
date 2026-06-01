import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('catalogPdf') as File | null;

  if (!file) {
    return NextResponse.json({ message: 'No file provided' }, { status: 400 });
  }

  if (file.type !== 'application/pdf') {
    return NextResponse.json(
      { message: 'Only PDF files are allowed' },
      { status: 400 }
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const ext = path.extname(file.name) || '.pdf';
  const safeBaseName = path
    .basename(file.name, ext)
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\u0600-\u06FF-]/g, '');

  const fileName = `${Date.now()}-${Math.floor(Math.random() * 1e9)}-${safeBaseName}${ext}`;

  // ✅ تغییر
  const dir = path.join('/storeage', 'catalogPdf');
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, fileName), buffer);

  return NextResponse.json({
    // ✅ تغییر
    pdf: `/api/images/catalogPdf/${fileName}`,
    fileName,
  });
}
