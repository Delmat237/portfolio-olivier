'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, MapPin, Calendar, Phone, Mail, Download, Github, Linkedin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import AnimatedSection from '@/components/shared/AnimatedSection'

const typingTexts = [
  "Étudiant Ingénieur Génie Civil",
  "Spécialiste en Mathématiques Appliquées",
  "Passionné d'Infrastructure",
  "Analyste Mathématique"
]

export default function Hero() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (isTyping) {
      const targetText = typingTexts[currentTextIndex]
      
      if (displayedText.length < targetText.length) {
        timeout = setTimeout(() => {
          setDisplayedText(targetText.slice(0, displayedText.length + 1))
        }, 100)
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false)
        }, 2000)
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1))
        }, 50)
      } else {
        setCurrentTextIndex((prev) => (prev + 1) % typingTexts.length)
        setIsTyping(true)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayedText, isTyping, currentTextIndex])

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleDownloadCV = () => {
    const link = document.createElement('a')
    link.href = '/CV-OLIVIER.pdf'
    link.download = 'CV-OLIVIER.pdf'
    link.click()
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 pb-10 bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* Effets de fond */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-blue-300/30 to-cyan-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-gradient-to-r from-sky-300/20 to-blue-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Contenu Textuel */}
          <AnimatedSection className="lg:order-1">
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-400 font-medium flex items-center gap-2">
                  <span className="w-2 h-2 bg-sky-500 rounded-full animate-pulse"></span>
                  Bonjour, je suis
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-blue-600">Olivier</span>
                  <br />
                  <span className="text-gray-700 dark:text-gray-300">Mogonel</span>
                </h1>
              </div>

              {/* Texte animé */}
              <div className="h-8 md:h-10">
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-medium">
                  {displayedText}
                  <span className="animate-pulse text-sky-500">|</span>
                </p>
              </div>

              {/* Description */}
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-lg">
                Étudiant en 4ème année de Génie Civil à l&apos;École Nationale Supérieure Polytechnique de Yaoundé
                et Master 2 en Mathématiques option Analyse et Applications. Passionné par l&apos;infrastructure
                durable et l&apos;innovation technique.
              </p>

              {/* Informations personnelles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-sky-500" />
                  <span>1er janvier 2001</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-sky-500" />
                  <span>Yaoundé, Cameroun</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-sky-500" />
                  <span>+237 695 025 278</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-sky-500" />
                  <span>Oliviermg10@gmail.com</span>
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  size="lg"
                  className="bg-sky-600 hover:bg-sky-700 text-white dark:bg-sky-700 dark:hover:bg-sky-800 px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Me contacter
                </Button>
                
                <Button
                  onClick={handleDownloadCV}
                  variant="outline"
                  size="lg"
                  className="border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Télécharger CV
                </Button>
              </div>

                {/* Liens sociaux */}
              <div className="flex gap-4 pt-6">
                <Link 
                  href="https://linkedin.com/in/olivier-mogonel" 
                  target="_blank"
                  className="w-12 h-12 bg-gray-200/50 dark:bg-gray-800/50 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full flex items-center justify-center transition-all duration-200 hover:-translate-y-1 group"
                >
                  <Linkedin className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-sky-600" />
                </Link>
                <Link 
                  href="https://github.com/olivier-mogonel" 
                  target="_blank"
                  className="w-12 h-12 bg-gray-200/50 dark:bg-gray-800/50 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full flex items-center justify-center transition-all duration-200 hover:-translate-y-1 group"
                >
                  <Github className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-sky-600" />
                </Link>
              </div>
            </div>
          </AnimatedSection>

          {/* Image de profil */}
          <AnimatedSection className="lg:order-2 flex justify-center">
            <div className="relative">
              {/* Cercles décoratifs */}
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              
              {/* Image principale */}
              <div className="relative w-72 h-72 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl">
                <Image
                  src="/images/profile.jpg"
                  alt="Olivier Mogonel - Portrait professionnel"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 320px, 384px"
                />
              </div>

             {/* Badges flottants */}
              <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-900 rounded-full p-3 shadow-lg border border-gray-100 dark:border-gray-800 animate-bounce">
                <div className="w-6 h-6 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">GC</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-900 rounded-full p-3 shadow-lg border border-gray-100 dark:border-gray-800 animate-bounce delay-500">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">M²</span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Indicateur de scroll */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button
            onClick={scrollToAbout}
            className="flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-200"
            aria-label="Faire défiler vers le bas"
          >
            <span className="text-sm">Découvrir</span>
            <ChevronDown className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  )
}
