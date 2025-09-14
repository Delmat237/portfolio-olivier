import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const messages = await prisma.message.findMany();
    return NextResponse.json(messages);
  } catch (error) {
    console.error('Erreur lors de la récupération des messages :', error);
    return NextResponse.json({ message: 'Erreur lors de la récupération des données' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}