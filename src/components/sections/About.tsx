// src/components/sections/About.tsx
'use client'

import Image from 'next/image'
import AnimatedSection from '@/components/shared/AnimatedSection'
import { getImagePath } from '@/config/images' // Importer la config


export default function About() {
  return (
    <section id="about" className="section-padding bg-gray-50 dark:bg-gray-950">
      <div className="container-custom">
        <AnimatedSection>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Conteneur de l'image de profil */}
            <div className="relative h-96 md:h-[500px] rounded-lg shadow-xl overflow-hidden group">
              <Image
                src={getImagePath('/images/profile.jpg')}
                alt="Olivier Mogonel - Profil"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>

            {/* Contenu du texte et de la deuxième image */}
            <div className="text-gray-900 dark:text-gray-100">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                À propos de <span className="gradient-text bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-blue-600">moi</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Je suis Olivier Mogonel, étudiant ingénieur en Génie Civil à l&apos;École Nationale Supérieure Polytechnique de Yaoundé.
                 Ma passion pour la construction et l&apos;innovation me pousse à m&apos;investir dans des projets complexes, 
                 du calcul de structures à la gestion de chantier. Je combine une solide formation théorique avec une expérience
                  pratique pour relever les défis de l&apos;ingénierie moderne.
              </p>

              {/* Conteneur de la deuxième image */}
              <div className="relative h-48 md:h-64 rounded-lg shadow-xl overflow-hidden group">
                <Image
                  src={getImagePath('/images/civil-engineering.jpg')}
                  alt="Génie Civil"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}