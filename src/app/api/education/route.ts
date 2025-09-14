import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import educationData from '@/data/education.json';

const prisma = new PrismaClient();

const educationSchema = z.object({
  id: z.number().optional(),
  period: z.string().min(1, 'La période est requise'),
  title: z.string().min(1, 'Le titre est requis'),
  institutions: z.array(z.string()).min(1, 'Au moins une institution est requise'),
  location: z.string().min(1, 'La localisation est requise'),
  status: z.enum(['En cours', 'Validé']),
  type: z.enum(['current', 'completed']),
  description: z.string().optional(),
  highlights: z.array(z.string()).optional(),
  // Correction : Ajout du champ 'icon' pour qu'il corresponde au modèle Prisma
  icon: z.string().min(1, 'L\'icône est requise'),
});

export async function GET() {
  try {
    const educations = await prisma.education.findMany({
      select: {
        id: true,
        period: true,
        title: true,
        institutions: true,
        location: true,
        status: true,
        type: true,
        description: true,
        highlights: true,
        icon: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(educations);
  } catch (error: unknown) {
    console.error('Erreur lors de la récupération des formations :', error);

    if (error instanceof Error && (error.name === 'PrismaClientInitializationError' || error.message.includes('Can\'t reach database server'))) {
      console.warn('Base de données inaccessible, utilisation des données statiques.');
      return NextResponse.json(educationData);
    }

    return NextResponse.json(
      { message: 'Erreur lors de la récupération des données' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = educationSchema.parse(body);

    const newEducation = await prisma.education.create({
      data: {
        ...validatedData,
        id: validatedData.id || Date.now(),
      },
    });

    return NextResponse.json(
      { message: 'Formation ajoutée avec succès', data: newEducation },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erreur lors de la création de la formation :', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Données invalides', issues: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Erreur lors de la création de la formation' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = educationSchema.parse(body);

    if (!validatedData.id) {
      return NextResponse.json(
        { message: 'L\'ID de la formation est requis' },
        { status: 400 }
      );
    }

    const updatedEducation = await prisma.education.update({
      where: { id: validatedData.id },
      data: validatedData,
    });

    return NextResponse.json(
      { message: 'Formation mise à jour avec succès', data: updatedEducation },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('Erreur lors de la mise à jour de la formation :', error);

    if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2025') {
      return NextResponse.json(
        { message: 'Formation non trouvée' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Erreur lors de la mise à jour de la formation' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { message: 'L\'ID de la formation est requis' },
        { status: 400 }
      );
    }

    await prisma.education.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'Formation supprimée avec succès' },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('Erreur lors de la suppression de la formation :', error);

    if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2025') {
      return NextResponse.json(
        { message: 'Formation non trouvée' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Erreur lors de la suppression de la formation' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
