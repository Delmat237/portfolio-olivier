// src/app/api/auth/route.ts
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('Format d\'email invalide'),
  password: z.string().min(1, 'Le mot de passe est requis')
})

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@gmail.com';
const ADMIN_PASSWORD_HASH="$2b$10$KBEpwx4JdQQu76xPSFW2lO/1eADQaFzB/tK6QplbryHbgol0fnadC"


if (!ADMIN_PASSWORD_HASH) {
  console.error('ADMIN_PASSWORD_HASH is not defined in environment variables.');
  // Handle this error appropriately, perhaps by returning a 500 response
  // or by exiting the application during startup.
}

const ADMIN_USER = {
  email: ADMIN_EMAIL,
  password: ADMIN_PASSWORD_HASH,
  name: 'Administrateur'
}

console.log('Loaded hash from .env:', ADMIN_PASSWORD_HASH);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = loginSchema.parse(body)
    const { email, password } = validatedData

    // Vérifier les identifiants
    if (email !== ADMIN_USER.email) {
      return NextResponse.json(
        { message: 'Identifiants incorrects' },
        { status: 401 }
      )
    }

    const isPasswordValid = await bcrypt.compare(password, ADMIN_USER.password)
    console.log('Password valid:', isPasswordValid);
console.log('Received password:', password);
console.log('Stored hash:', ADMIN_USER.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Identifiants incorrects' },
        { status: 401 }
      )
    }

    // Générer le token JWT
    const token = jwt.sign(
      { email: ADMIN_USER.email, name: ADMIN_USER.name },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    )

    return NextResponse.json({
      message: 'Connexion réussie',
      user: {
        email: ADMIN_USER.email,
        name: ADMIN_USER.name
      },
      token,
      expiresIn: 24 * 60 * 60 * 1000 // 24 heures en millisecondes
    })

  } catch (error) {
    console.error('Login error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          message: 'Données invalides',
          errors: error.errors
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: 'Erreur de connexion' },
      { status: 500 }
    )
  }
}