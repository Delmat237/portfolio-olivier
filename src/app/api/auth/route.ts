import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@/generated/prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient(); // Instantiation manuelle
const JWT_SECRET = process.env.JWT_SECRET;

const loginSchema = z.object({
  email: z.string().email('Format d\'email invalide'),
  password: z.string().min(1, 'Le mot de passe est requis'),
});

// Vérification des variables d'environnement
if (!process.env.JWT_SECRET || !process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD_HASH) {
  console.error('Erreur: JWT_SECRET, ADMIN_EMAIL ou ADMIN_PASSWORD_HASH manquant dans les variables d\'environnement.');
  throw new Error('Configuration manquante. Vérifiez votre fichier .env.');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = loginSchema.parse(body);
    const { email, password } = validatedData;

    // Tentative de connexion via la base de données
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return NextResponse.json(
          { message: 'Email incorrect' },
          { status: 401 }
        );
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log('Received password:', password);
      console.log('Stored hash:', user.password);
      console.log('Password valid:', isPasswordValid);

      if (!isPasswordValid) {
        return NextResponse.json(
          { message: 'Mot de passe incorrect' },
          { status: 401 }
        );
      }

      // Générer le token JWT
      const token = jwt.sign(
        { email: user.email, name: user.name },
        JWT_SECRET!,
        { expiresIn: '24h' }
      );

      return NextResponse.json({
        message: 'Connexion réussie',
        user: {
          email: user.email,
          name: user.name,
        },
        token,
        expiresIn: 24 * 60 * 60 * 1000,
      });
    } catch (dbError: unknown) {
      // Fallback si la base est inaccessible
      if (
        (dbError instanceof Error && dbError.name === 'PrismaClientInitializationError') ||
        String(dbError).includes('Can\'t reach database server')
      ) {
        console.warn('Base de données inaccessible, utilisation des données statiques depuis .env.');
        if (email === process.env.ADMIN_EMAIL) {
          const isPasswordValid = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH || '');
          if (!isPasswordValid) {
            return NextResponse.json(
              { message: 'Mot de passe incorrect' },
              { status: 401 }
            );
          }

          // Générer le token JWT avec les données statiques
          const token = jwt.sign(
            { email: process.env.ADMIN_EMAIL, name: 'Utilisateur par défaut' },
            JWT_SECRET!,
            { expiresIn: '24h' }
          );

          return NextResponse.json({
            message: 'Connexion réussie (mode fallback)',
            user: {
              email: process.env.ADMIN_EMAIL,
              name: 'Utilisateur par défaut',
            },
            token,
            expiresIn: 24 * 60 * 60 * 1000,
          });
        }
        return NextResponse.json(
          { message: 'Email incorrect' },
          { status: 401 }
        );
      }
      throw dbError;
    }
  } catch (error) {
    console.error('Login error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Données invalides', errors: error.issues }, // Correction ici : 'issues' au lieu de 'errors'
        { status: 400 }
      );
    }

    if (error instanceof Error && error.message === 'Configuration manquante. Vérifiez votre fichier .env.') {
      return NextResponse.json(
        { message: 'Erreur de configuration serveur' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Erreur de connexion' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
