import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type Params = {
  params: { id: string };
};

export async function GET(req: Request, { params }: Params) {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(req: Request, { params }: Params) {
  const data = await req.json();
  const updated = await prisma.product.update({
    where: { id: parseInt(params.id) },
    data,
  });
  return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: Params) {
  await prisma.product.delete({
    where: { id: parseInt(params.id) },
  });
  return NextResponse.json({ success: true });
}
