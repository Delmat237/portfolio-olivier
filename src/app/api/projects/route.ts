// src/app/api/projects/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const projectSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Le titre est requis'),
  description: z.string().min(1, 'La description est requise'),
  category: z.string().min(1, 'La catégorie est requise'),
  technologies: z.array(z.string()),
  status: z.enum(['En cours', 'Terminé', 'En pause']),
  image: z.string().optional(),
  link: z.string().optional(),
  startDate: z.string(),
  endDate: z.string().optional(),
  highlights: z.array(z.string()).optional()
})

// Données de projets simulées
let projectsData = [
  {
    id: '1',
    title: 'Analyse structurelle d\'un pont',
    description: 'Modélisation et calcul de résistance pour un pont en béton armé',
    category: 'Génie Civil',
    technologies: ['AutoCAD', 'Calculs manuels', 'Béton armé'],
    status: 'Terminé',
    image: '/images/projects/pont.jpg',
    startDate: '2023-09',
    endDate: '2023-12',
    highlights: [
      'Dimensionnement des poutres principales',
      'Calcul des charges et surcharges',
      'Vérification de la stabilité'
    ]
  },
  {
    id: '2',
    title: 'Optimisation mathématique',
    description: 'Résolution d\'équations différentielles pour la modélisation de structures',
    category: 'Mathématiques',
    technologies: ['MATLAB', 'Python', 'Analyse numérique'],
    status: 'En cours',
    startDate: '2024-01',
    highlights: [
      'Méthodes de Runge-Kutta',
      'Approximations par différences finies',
      'Validation des résultats'
    ]
  }
]

export async function GET() {
  try {
    return NextResponse.json({ data: projectsData })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { message: 'Erreur lors de la récupération des projets' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = projectSchema.parse(body)
    
    const newProject = {
      ...validatedData,
      id: validatedData.id || Date.now().toString()
    }
    
    projectsData.push(newProject)
    
    return NextResponse.json(
      { message: 'Projet ajouté avec succès', data: newProject },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating project:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Données invalides', errors: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { message: 'Erreur lors de la création du projet' },
      { status: 500 }
    )
  }
}
