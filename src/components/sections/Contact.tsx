'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Clock, MessageSquare, type LucideIcon } from 'lucide-react'
import AnimatedSection from '@/components/shared/AnimatedSection'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

// Interfaces pour la cohérence des données
interface ContactInfo {
  icon: LucideIcon
  title: string
  value: string
  description: string
  color: string
  href: string
}

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

const contactInfo: ContactInfo[] = [
  {
    icon: Phone,
    title: 'Téléphone',
    value: '+237 695 025 278',
    description: 'Disponible du lundi au vendredi',
    color: 'from-sky-500 to-blue-600',
    href: 'tel:+237695025278'
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'Oliviermg10@gmail.com',
    description: 'Réponse sous 24h',
    color: 'from-purple-500 to-indigo-600',
    href: 'mailto:Oliviermg10@gmail.com'
  },
  {
    icon: MapPin,
    title: 'Localisation',
    value: 'Yaoundé, Cameroun',
    description: 'École Nationale Supérieure Polytechnique',
    color: 'from-green-500 to-emerald-600',
    href: '#'
  }
]

const initialFormData: FormData = {
  name: '',
  email: '',
  subject: '',
  message: ''
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Le nom doit contenir au moins 2 caractères'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Le sujet est requis'
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = 'Le sujet doit contenir au moins 5 caractères'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error('Veuillez corriger les erreurs dans le formulaire')
      return
    }

    setIsSubmitting(true)

    try {
      // NOTE: Ceci est un appel API simulé.
      // Remplacez-le par votre logique de soumission de formulaire réelle.
      await new Promise(resolve => setTimeout(resolve, 1500)); 

      toast.success('Message envoyé avec succès !', {
        description: 'Je vous répondrai dans les plus brefs délais.'
      })
      setFormData(initialFormData)
    } catch (error) {
      console.error('Error sending email:', error)
      toast.error('Erreur lors de l\'envoi', {
        description: 'Veuillez réessayer plus tard ou me contacter directement.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="section-padding bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="container-custom">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Contactez-<span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-blue-600">moi</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Vous avez un projet en tête ? Une question sur mes compétences ?
              N&apos;hésitez pas à me contacter. Je serais ravi d&apos;échanger avec vous.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Informations de contact */}
          <AnimatedSection>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                  Informations de contact
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  Je suis toujours ouvert aux nouvelles opportunités et collaborations.
                  Que ce soit pour un stage, un projet ou simplement pour échanger
                  sur le génie civil et les mathématiques, contactez-moi !
                </p>
              </div>

              {/* Cartes d'information */}
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300 group cursor-pointer bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-r ${info.color} group-hover:scale-105 transition-transform duration-200`}>
                          <info.icon className="w-7 h-7 text-white" />
                        </div>

                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                            {info.title}
                          </h4>
                          <p className="text-gray-700 dark:text-gray-300 font-medium mb-1">
                            {info.value}
                          </p>
                          <p className="text-gray-500 dark:text-gray-500 text-sm">
                            {info.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Disponibilité */}
              <Card className="bg-sky-50 dark:bg-sky-900 border border-sky-200 dark:border-sky-800">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-sky-600 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        Disponibilité
                      </h4>
                      <div className="space-y-1 text-gray-600 dark:text-gray-400">
                        <p>• Actuellement en études à Yaoundé</p>
                        <p>• Ouvert aux stages et projets</p>
                        <p>• Disponible pour des collaborations académiques</p>
                        <p>• Réponse rapide aux messages</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </AnimatedSection>

          {/* Formulaire de contact */}
          <AnimatedSection>
            <Card className="shadow-xl border-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    Envoyez-moi un message
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Nom */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Nom complet *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Votre nom complet"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`
                        ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}
                        bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700
                      `}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Adresse email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="votre.email@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`
                        ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}
                        bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700
                      `}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Sujet */}
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-gray-700 dark:text-gray-300">Sujet *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="Objet de votre message"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`
                        ${errors.subject ? 'border-red-500 focus:ring-red-500' : ''}
                        bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700
                      `}
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-700 dark:text-gray-300">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Décrivez votre projet, vos questions ou ce dont vous aimeriez discuter..."
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`
                        ${errors.message ? 'border-red-500 focus:ring-red-500' : ''}
                        bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700
                      `}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Bouton d'envoi */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-sky-600 hover:bg-sky-700 text-white dark:bg-sky-700 dark:hover:bg-sky-800 py-3 px-8 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Envoi en cours...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="w-5 h-5" />
                        Envoyer le message
                      </div>
                    )}
                  </Button>

                  {/* Note */}
                  <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-sky-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <p className="font-medium text-gray-900 dark:text-gray-200 mb-1">Engagement de confidentialité</p>
                        <p>
                          Vos informations personnelles sont traitées avec la plus grande confidentialité
                          et ne seront utilisées que pour répondre à votre demande.
                        </p>
                      </div>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
