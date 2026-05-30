import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const data = await prisma.fAQ.findMany();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'مشکلی در api به وجود امد.' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { question, answer } = await req.json();
    const newFAQ = await prisma.fAQ.create({
      data: {
        question,
        answer,
      },
    });
    return NextResponse.json(newFAQ, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'مشکلی در api به وجود امد.' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const { id } = await req.json();
    const deletedFAQ = await prisma.fAQ.delete({
      where: { id },
    });
    return NextResponse.json(deletedFAQ);
  } catch (error) {
    return NextResponse.json(
      { error: 'مشکلی در api به وجود امد.' },
      { status: 500 }
    );
  }
}
