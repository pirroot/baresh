import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('image') as File | null;

  if (!file) {
    return NextResponse.json({ message: 'No file provided' }, { status: 400 });
  }

  if (!file.type.startsWith('image/')) {
    return NextResponse.json(
      { message: 'Only images are allowed' },
      { status: 400 }
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const ext = path.extname(file.name) || '.jpg';
  const safeBaseName = path
    .basename(file.name, ext)
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\u0600-\u06FF-]/g, '');

  const fileName = `${Date.now()}-${Math.floor(Math.random() * 1e9)}-${safeBaseName}${ext}`;

  const dir = path.join(process.cwd(), 'public', 'product');
  await mkdir(dir, { recursive: true });

  const filePath = path.join(dir, fileName);
  await writeFile(filePath, buffer);

  return NextResponse.json({
    image: `/product/${fileName}`,
    fileName,
  });
}
