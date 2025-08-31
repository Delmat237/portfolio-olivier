// src/app/api/send-email/route.ts
import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { z } from 'zod'
import educationData  from '@/data/education/educationData'

// Schema de validation pour les données du formulaire
const contactSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Format d\'email invalide'),
  subject: z.string().min(5, 'Le sujet doit contenir au moins 5 caractères'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères')
})
const educationSchema = z.object({
  id: z.string().optional(),
  period: z.string().min(1, 'La période est requise'),
  title: z.string().min(1, 'Le titre est requis'),
  institutions: z.array(z.string()).min(1, 'Au moins une institution est requise'),
  location: z.string().min(1, 'La localisation est requise'),
  status: z.enum(['En cours', 'Validé']),
  type: z.enum(['current', 'completed']),
  description: z.string().optional(),
  highlights: z.array(z.string()).optional()
})
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validation des données
    const validatedData = contactSchema.parse(body)
    const { name, email, subject, message } = validatedData

    // Configuration du transporteur email
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Mot de passe d'application Gmail
      },
    })

    // Template HTML de l'email
    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Nouveau message - Portfolio Olivier Mogonel</title>
        </head>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #3b82f6; color: white; padding: 20px; text-align: center;">
            <h1>Nouveau message depuis le portfolio</h1>
          </div>
          
          <div style="padding: 30px; background-color: #f8fafc;">
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #1f2937; margin-bottom: 15px;">Informations du contact</h2>
              <p style="margin: 5px 0;"><strong>Nom :</strong> ${name}</p>
              <p style="margin: 5px 0;"><strong>Email :</strong> ${email}</p>
              <p style="margin: 5px 0;"><strong>Sujet :</strong> ${subject}</p>
            </div>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px;">
              <h2 style="color: #1f2937; margin-bottom: 15px;">Message</h2>
              <div style="background-color: #f1f5f9; padding: 15px; border-radius: 6px; border-left: 4px solid #3b82f6;">
                <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
          </div>
          
          <div style="background-color: #e5e7eb; padding: 15px; text-align: center; font-size: 12px; color: #6b7280;">
            <p>Ce message a été envoyé depuis le portfolio d'Olivier Mogonel</p>
            <p>© 2024 Olivier Mogonel - Tous droits réservés</p>
          </div>
        </body>
      </html>
    `

    // Options de l'email
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: 'Oliviermg10@gmail.com',
      subject: `[Portfolio] ${subject}`,
      html: htmlTemplate,
      replyTo: email
    }

    // Envoi de l'email
    await transporter.sendMail(mailOptions)

    
    return NextResponse.json(
      { message: 'Erreur lors de la création' },
      { status: 500 }
    )
  }catch{
    console.log("ERROR")
    return NextResponse.json(
      { message: 'Erreur lors de la création' },
      { status: 500 }
    )
  }
}

 export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = educationSchema.parse(body)
    
    const index = educationData.findIndex(item => item.id === validatedData.id)
    if (index === -1) {
      return NextResponse.json(
        { message: 'Formation non trouvée' },
        { status: 404 }
      )
    }
    
    educationData[index] = { ...educationData[index], ...validatedData }
    
    return NextResponse.json({
      message: 'Formation mise à jour avec succès',
      data: educationData[index]
    })
  } catch (error) {
    console.error('Error updating education:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Données invalides', errors: error },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { message: 'Erreur lors de la mise à jour' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { message: 'ID requis' },
        { status: 400 }
      )
    }
    
    const index = educationData.findIndex(item => item.id === id)
    if (index === -1) {
      return NextResponse.json(
        { message: 'Formation non trouvée' },
        { status: 404 }
      )
    }
    
    educationData.splice(index, 1)
    
    return NextResponse.json({
      message: 'Formation supprimée avec succès'
    })
  } catch (error) {
    console.error('Error deleting education:', error)
    return NextResponse.json(
      { message: 'Erreur lors de la suppression' },
      { status: 500 }
    )
  }
}