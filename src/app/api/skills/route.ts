import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import skillsData from '@/data/skills.json'; // Import des données statiques

const prisma = new PrismaClient();

// Schémas de validation avec zod
const skillCategorySchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, 'Le titre est requis'),
  icon: z.string().min(1, 'L\'icône est requise'),
  color: z.string().min(1, 'La couleur est requise'),
  bgColor: z.string().min(1, 'La couleur de fond est requise'),
});

const skillSchema = z.object({
  id: z.number().optional(),
  categoryId: z.number().min(1, 'L\'ID de la catégorie est requis'),
  name: z.string().min(1, 'Le nom est requis'),
  level: z.number().min(0).max(100, 'Le niveau doit être entre 0 et 100'),
  description: z.string().optional(),
});

export async function GET() {
  try {
    const skillCategories = await prisma.skillCategory.findMany({
      include: {
        skills: true, // Relation avec les compétences
      },
      orderBy: {
        id: 'asc',
      },
    });

    return NextResponse.json(skillCategories);
  } catch (error: any) {
    console.error('Erreur lors de la récupération des compétences :', error);

    // Vérifie si l'erreur est liée à l'initialisation de Prisma ou à une connexion échouée
    if (error.name === 'PrismaClientInitializationError' || error.message.includes('Can\'t reach database server')) {
      console.warn('Base de données inaccessible, utilisation des données statiques.');
      return NextResponse.json(skillsData.skillCategories); // Retourne les catégories statiques
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

    // Déterminer si c'est une catégorie ou une compétence
    if (body.categoryId) {
      // Création d'une compétence
      const validatedSkill = skillSchema.parse(body);
      const newSkill = await prisma.skill.create({
        data: {
          ...validatedSkill,
          category: { connect: { id: validatedSkill.categoryId } },
        },
      });
      return NextResponse.json(
        { message: 'Compétence ajoutée avec succès', data: newSkill },
        { status: 201 }
      );
    } else {
      // Création d'une catégorie
      const validatedCategory = skillCategorySchema.parse(body);
      const newCategory = await prisma.skillCategory.create({
        data: validatedCategory,
      });
      return NextResponse.json(
        { message: 'Catégorie ajoutée avec succès', data: newCategory },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error('Erreur lors de la création :', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Données invalides', errors: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Erreur lors de la création' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json(
        { message: 'L\'ID est requis' },
        { status: 400 }
      );
    }

    if (body.categoryId) {
      // Mise à jour d'une compétence
      const validatedSkill = skillSchema.parse(body);
      const updatedSkill = await prisma.skill.update({
        where: { id: body.id },
        data: {
          ...validatedSkill,
          category: { connect: { id: validatedSkill.categoryId } },
        },
      });
      return NextResponse.json(
        { message: 'Compétence mise à jour avec succès', data: updatedSkill },
        { status: 200 }
      );
    } else {
      // Mise à jour d'une catégorie
      const validatedCategory = skillCategorySchema.parse(body);
      const updatedCategory = await prisma.skillCategory.update({
        where: { id: body.id },
        data: validatedCategory,
      });
      return NextResponse.json(
        { message: 'Catégorie mise à jour avec succès', data: updatedCategory },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour :', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Données invalides', errors: error.errors },
        { status: 400 }
      );
    }

    if (error.code === 'P2025') {
      return NextResponse.json(
        { message: 'Élément non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Erreur lors de la mise à jour' },
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
        { message: 'L\'ID est requis' },
        { status: 400 }
      );
    }

    // Vérifier si c'est une catégorie ou une compétence (approximation basée sur l'ID)
    const category = await prisma.skillCategory.findUnique({ where: { id } });
    if (category) {
      await prisma.skillCategory.delete({ where: { id } });
      return NextResponse.json(
        { message: 'Catégorie supprimée avec succès' },
        { status: 200 }
      );
    }

    const skill = await prisma.skill.findUnique({ where: { id } });
    if (skill) {
      await prisma.skill.delete({ where: { id } });
      return NextResponse.json(
        { message: 'Compétence supprimée avec succès' },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: 'Élément non trouvé' },
      { status: 404 }
    );
  } catch (error) {
    console.error('Erreur lors de la suppression :', error);

    if (error.code === 'P2025') {
      return NextResponse.json(
        { message: 'Élément non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Erreur lors de la suppression' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}