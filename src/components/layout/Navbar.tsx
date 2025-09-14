'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, User, GraduationCap, Briefcase, Mail, Award, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navigationItems = [
  { name: 'Accueil', href: '#hero', icon: Home },
  { name: 'À propos', href: '#about', icon: User },
  { name: 'Formation', href: '#education', icon: GraduationCap },
  { name: 'Compétences', href: '#skills', icon: Briefcase },
  { name: 'Projets', href: '#projects', icon: Award },
  { name: 'Contact', href: '#contact', icon: Mail },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      const sections = navigationItems.map(item => item.href.slice(1))
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    const element = document.querySelector(href)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 dark:bg-gray-950/90 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-800/50 shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-3 group"
            onClick={() => handleNavClick('#hero')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-200 shadow-md">
              <span className="text-white font-bold text-lg">OM</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-lg text-gray-900 dark:text-gray-100">Olivier Mogonel</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Ingénieur Génie Civil</p>
            </div>
          </Link>

          {/* Navigation Desktop */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const isActive = activeSection === item.href.slice(1)
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300'
                      : 'text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </button>
              )
            })}
          </div>

          {/* Bouton Admin */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/admin/login">
              <Button 
                variant="outline" 
                size="sm"
                className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-none shadow-md hover:from-purple-600 hover:to-indigo-700 transition-colors"
              >
                Admin
              </Button>
            </Link>
          </div>

          {/* Menu Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-50 dark:hover:bg-gray-800 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      <div className={`lg:hidden transition-all duration-300 ease-in-out ${
        isOpen 
          ? 'max-h-screen opacity-100' 
          : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="bg-white/95 dark:bg-gray-950/90 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-800/50">
          <div className="container-custom py-4">
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const isActive = activeSection === item.href.slice(1)
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      isActive
                        ? 'bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300'
                        : 'text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </button>
                )
              })}
              
              {/* Bouton Admin Mobile */}
              <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-800">
                <Link href="/admin/login">
                  <Button 
                    variant="default" 
                    className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md hover:from-purple-600 hover:to-indigo-700 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Administration
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}