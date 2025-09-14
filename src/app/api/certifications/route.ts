import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import certificationsData from '@/data/certifications.json';

const prisma = new PrismaClient();

// Schéma de validation avec zod
const certificationSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Le nom est requis'),
  description: z.string().min(1, 'La description est requise'),
  type: z.string().min(1, 'Le type est requis'),
  institution: z.string().min(1, 'L\'institution est requise'),
  // Le type est un nombre dans Zod, nous le convertirons en string pour Prisma
  year: z.number().min(1900, 'Année invalide').max(new Date().getFullYear(), 'Année future non autorisée'),
  location: z.string().min(1, 'L\'emplacement est requis'),
  image: z.string().optional(),
  icon: z.string().min(1, 'L\'icône est requise'),
  color: z.string().min(1, 'La couleur est requise'),
  verified: z.boolean().optional(),
});

export async function GET() {
  try {
    const certifications = await prisma.certification.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        type: true,
        institution: true,
        year: true,
        location: true,
        color: true,
        verified: true,
        icon: true,
      },
      orderBy: {
        year: 'desc',
      },
    });

    return NextResponse.json(certifications);
  } catch (error: unknown) {
    console.error('Erreur lors de la récupération des certifications :', error);

    if (error instanceof Error && error.name === 'PrismaClientInitializationError' || error instanceof Error && error.message.includes('Can\'t reach database server')) {
      console.warn('Base de données inaccessible, utilisation des données statiques.');
      return NextResponse.json(certificationsData);
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
    const validatedData = certificationSchema.parse(body);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, year, ...dataWithoutId } = validatedData;

    const newCertification = await prisma.certification.create({
      data: {
        ...dataWithoutId,
        // Conversion du nombre 'year' en chaîne de caractères pour Prisma
        year: year.toString(),
        verified: dataWithoutId.verified || false,
      },
    });

    return NextResponse.json(
      { message: 'Certification ajoutée avec succès', data: newCertification },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erreur lors de la création de la certification :', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Données invalides', issues: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Erreur lors de la création de la certification' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = certificationSchema.parse(body);

    if (!validatedData.id) {
      return NextResponse.json(
        { message: 'L\'ID de la certification est requis' },
        { status: 400 }
      );
    }

    const { id, year, ...dataWithoutId } = validatedData;

    const updatedCertification = await prisma.certification.update({
      where: { id: id },
      data: {
        ...dataWithoutId,
        // Conversion du nombre 'year' en chaîne de caractères pour Prisma
        year: year.toString(),
        verified: dataWithoutId.verified || false,
      },
    });

    return NextResponse.json(
      { message: 'Certification mise à jour avec succès', data: updatedCertification },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('Erreur lors de la mise à jour de la certification :', error);

    if (error instanceof Error && 'code' in error && error.code === 'P2025') {
      return NextResponse.json(
        { message: 'Certification non trouvée' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Erreur lors de la mise à jour de la certification' },
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
        { message: 'L\'ID de la certification est requis' },
        { status: 400 }
      );
    }

    await prisma.certification.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(
      { message: 'Certification supprimée avec succès' },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('Erreur lors de la suppression de la certification :', error);

    if (error instanceof Error && 'code' in error && error.code === 'P2025') {
      return NextResponse.json(
        { message: 'Certification non trouvée' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Erreur lors de la suppression de la certification' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}