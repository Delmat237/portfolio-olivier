import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import projectsData from '@/data/projects.json'; // Import des données statiques

const prisma = new PrismaClient();

// Schéma mis à jour pour harmoniser avec le composant
const projectSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, 'Le titre est requis'),
  description: z.string().min(1, 'La description est requise'),
  category: z.enum(['civil', 'math', 'technical'], 'La catégorie doit être civil, math ou technical'),
  technologies: z.array(z.string()).min(1, 'Au moins une technologie est requise'),
  status: z.enum(['current', 'completed', 'paused'], 'Le statut doit être current, completed ou paused'),
  image: z.string().min(1, 'Une image est requise'),
  link: z.string().optional(),
  startDate: z.string().refine((val) => !isNaN(Date.parse(val)), 'Date de début invalide'),
  endDate: z.string().optional().refine((val) => !val || !isNaN(Date.parse(val)), 'Date de fin invalide'),
  highlights: z.array(z.string()).optional(),
});

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        technologies: true,
        status: true,
        image: true,
        link: true,
        startDate: true,
        endDate: true,
        highlights: true,
        detailedDescription: true, // Ajouté pour correspondre au composant
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const categories = await prisma.projectCategory.findMany(); // Supposant une table pour les catégories

    return NextResponse.json({ projects, categories }); // Renvoie un objet avec projets et catégories
  } catch (error: unknown) {
    console.error('Erreur lors de la récupération des projets :', error);

    // Correction : Utilisation d'un garde de type pour accéder aux propriétés de l'erreur
    if (error instanceof Error && (error.name === 'PrismaClientInitializationError' || error.message.includes('Can\'t reach database server'))) {
      console.warn('Base de données inaccessible, utilisation des données statiques.');
      return NextResponse.json(projectsData); // Retourne les données statiques
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
    const validatedData = projectSchema.parse(body);

    const newProject = await prisma.project.create({
      data: {
        ...validatedData,
        id: validatedData.id || undefined, // Laisser Prisma générer l'ID si non fourni
        startDate: new Date(validatedData.startDate),
        endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
        detailedDescription: validatedData.description, // Mappe description vers detailedDescription
      },
    });

    return NextResponse.json(
      { message: 'Projet ajouté avec succès', data: newProject },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erreur lors de la création du projet :', error);

    if (error instanceof z.ZodError) {
      // Correction : Zod utilise la propriété 'issues' et non 'errors'
      return NextResponse.json(
        { message: 'Données invalides', issues: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Erreur lors de la création du projet' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = projectSchema.parse(body);

    if (!validatedData.id) {
      return NextResponse.json(
        { message: 'L\'ID du projet est requis' },
        { status: 400 }
      );
    }

    const updatedProject = await prisma.project.update({
      where: { id: validatedData.id },
      data: {
        ...validatedData,
        startDate: new Date(validatedData.startDate),
        endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
        detailedDescription: validatedData.description, // Mappe description vers detailedDescription
      },
    });

    return NextResponse.json(
      { message: 'Projet mis à jour avec succès', data: updatedProject },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('Erreur lors de la mise à jour du projet :', error);

    if (error instanceof z.ZodError) {
      // Correction : Zod utilise la propriété 'issues' et non 'errors'
      return NextResponse.json(
        { message: 'Données invalides', issues: error.issues },
        { status: 400 }
      );
    }

    // Correction : Vérification du type pour accéder à la propriété 'code'
    if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2025') {
      return NextResponse.json(
        { message: 'Projet non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Erreur lors de la mise à jour du projet' },
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
        { message: 'L\'ID du projet est requis' },
        { status: 400 }
      );
    }

    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'Projet supprimé avec succès' },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('Erreur lors de la suppression du projet :', error);

    // Correction : Vérification du type pour accéder à la propriété 'code'
    if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2025') {
      return NextResponse.json(
        { message: 'Projet non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Erreur lors de la suppression du projet' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
