// src/lib/validations.ts
import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(100, 'Le nom ne peut pas dépasser 100 caractères')
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Le nom ne peut contenir que des lettres, espaces, apostrophes et tirets'),
  
  email: z
    .string()
    .email('Format d\'email invalide')
    .max(255, 'L\'email ne peut pas dépasser 255 caractères'),
  
  subject: z
    .string()
    .min(5, 'Le sujet doit contenir au moins 5 caractères')
    .max(200, 'Le sujet ne peut pas dépasser 200 caractères'),
  
  message: z
    .string()
    .min(10, 'Le message doit contenir au moins 10 caractères')
    .max(2000, 'Le message ne peut pas dépasser 2000 caractères')
})

export const loginSchema = z.object({
  email: z.string().email('Format d\'email invalide'),
  password: z.string().min(1, 'Le mot de passe est requis')
})

export const educationFormSchema = z.object({
  period: z.string().min(1, 'La période est requise'),
  title: z.string().min(1, 'Le titre est requis'),
  institutions: z.array(z.string()).min(1, 'Au moins une institution est requise'),
  location: z.string().min(1, 'La localisation est requise'),
  status: z.enum(['En cours', 'Validé']),
  type: z.enum(['current', 'completed']),
  description: z.string().optional(),
  highlights: z.array(z.string()).optional()
})

export const projectFormSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  description: z.string().min(1, 'La description est requise'),
  category: z.string().min(1, 'La catégorie est requise'),
  technologies: z.array(z.string()),
  status: z.enum(['En cours', 'Terminé', 'En pause']),
  image: z.string().optional(),
  link: z.string().url('URL invalide').optional(),
  startDate: z.string(),
  endDate: z.string().optional(),
  highlights: z.array(z.string()).optional()
}).json(
      { message: 'Email envoyé avec succès' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error sending email:', error)
    
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
      { message: 'Erreur lors de l\'envoi de l\'email' },
      { status: 500 }
    )
  }
}
