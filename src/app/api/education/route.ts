// src/app/api/education/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Schema de validation pour l'éducation
const educationSchema = z.object({
  id: z.string().optional(),
  period: z.string().min(1, 'La période est requise'),
  title: z.string().min(1, 'Le titre est requis'),
  institutions: z.array(z.string()).min(1, 'Au moins une institution est requise'),
  location: z.string().min(1, 'La localisation est requise'),
  status: z.enum(['En cours', 'Validé']),
  type: z.enum(['current', 'completed']),
  description: z.string(),
  highlights: z.array(z.string())
})

// Données d'éducation (simulées - dans un vrai projet, utiliser une base de données)
const educationData = [
  {
    id: 'current',
    period: '2024-2025',
    title: 'Master 2 en Mathématiques & 3ème année Génie Civil',
    institutions: [
      'Université de Yaoundé I (Master 2 Mathématiques option Analyse et Applications)',
      'École Nationale Supérieure Polytechnique de Yaoundé (3ème année Génie Civil)'
    ],
    location: 'Yaoundé, Cameroun',
    status: 'En cours',
    type: 'current',
    description: 'Formation avancée combinant expertise mathématique théorique et application pratique en génie civil.',
    highlights: [
      'Analyse fonctionnelle et équations différentielles',
      'Conception d\'ouvrages en béton armé',
      'Modélisation mathématique des structures',
      'Mécanique des sols et fondations'
    ]
  }
  // ... autres entrées
]

export async function GET() {
  try {
    return NextResponse.json({ data: educationData })
  } catch (error) {
    console.error('Error fetching education:', error)
    return NextResponse.json(
      { message: 'Erreur lors de la récupération des données' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = educationSchema.parse(body)
    
    const newEducation = {
      ...validatedData,
      id: validatedData.id || Date.now().toString()
    }
    
    educationData.push(newEducation)
    
    return NextResponse.json(
      { message: 'Formation ajoutée avec succès', data: newEducation },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating education:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Données invalides', errors: error },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { message: 'Erreur lors de la création de la formation' },
      { status: 500 }
    )
  }
}   
