// src/components/layout/Footer.tsx
'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin, Heart, ArrowUp, Github, Linkedin, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navigationLinks = [
    { name: 'À propos', href: '#about' },
    { name: 'Formation', href: '#education' },
    { name: 'Compétences', href: '#skills' },
    { name: 'Projets', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ]

  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/leonel-azangue' },
    { name: 'GitHub', icon: Github, href: 'https://github.com/Delmat237' },
    { name: 'Email', icon: Mail, href: 'mailto:Oliviermg10@gmail.com' }
  ]

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-gray-900 text-white relative">
      {/* Bouton scroll to top */}
      <button
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-primary-600 hover:bg-primary-700 rounded-full flex items-center justify-center transition-colors duration-200 shadow-lg"
        aria-label="Retour en haut"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      <div className="container-custom pt-16 pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Colonne 1: À propos */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-civil-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">OM</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Olivier Mogonel</h3>
                <p className="text-gray-400 text-sm">Ingénieur Génie Civil & Mathématiques</p>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed mb-6">
              Étudiant passionné en 4ème année de Génie Civil à l&#39;École Nationale Supérieure 
              Polytechnique de Yaoundé et Master 2 en Mathématiques. Spécialisé dans l&#39;analyse 
              structurelle et l&#39;optimisation mathématique.
            </p>

            {/* Réseaux sociaux */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors duration-200 group"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                </Link>
              ))}
            </div>
          </div>

          {/* Colonne 2: Navigation */}
          <div>
            <h4 className="text-lg font-bold mb-6">Navigation</h4>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3: Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="w-5 h-5 text-primary-400" />
                <span>+237 695 025 278</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="w-5 h-5 text-primary-400" />
                <span>Oliviermg10@gmail.com</span>
              </div>
              <div className="flex items-start gap-3 text-gray-300">
                <MapPin className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" />
                <span>Yaoundé, Cameroun<br />École Nationale Supérieure Polytechnique</span>
              </div>
            </div>

            {/* CTA */}
            <Button
              onClick={() => handleNavClick('#contact')}
              className="mt-6 w-full bg-primary-600 hover:bg-primary-700"
            >
              Me contacter
            </Button>
          </div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-gray-400">
              <span>© {currentYear} ALD. Fait avec</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>à Yaoundé</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <Link href="/admin/login" className="hover:text-primary-400 transition-colors duration-200">
                Administration
              </Link>
              <span>•</span>
              <span>Next.js & TypeScript</span>
              <span>•</span>
              <Link 
                href="https://vercel.com" 
                target="_blank"
                className="flex items-center gap-1 hover:text-primary-400 transition-colors duration-200"
              >
                Hébergé sur Vercel <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
