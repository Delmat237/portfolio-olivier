// src/components/sections/About.tsx
'use client'

import Image from 'next/image'
import AnimatedSection from '@/components/shared/AnimatedSection'
import { getImagePath } from '@/config/images' // Importer la config

export default function About() {
  return (
    <section id="about" className="section-padding bg-gradient-to-br from-slate-50 via-blue-500 to-sky-600">
      <div className="container-custom">
        <AnimatedSection>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 md:h-[500px]">
               <Image
                src={getImagePath('/images/profile.jpg')} // Utiliser getImagePath
                alt="Olivier Mogonel - Profil"
                fill
                className="object-cover rounded-lg shadow-lg"
                sizes="(max-width: 1024px) 100vw, 50vw"
              /> 
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                À propos de <span className="gradient-text">moi</span>
              </h2>
              <p className="text-gray-600 mb-6">
                Je suis Olivier Mogonel, étudiant ingénieur en Génie Civil à l`&#39;`École Nationale Supérieure Polytechnique de Yaoundé...
              </p>
              <div className="relative h-48 md:h-64">
                <Image
                  src={getImagePath('/images/civil-engineering.jpg')} // Utiliser getImagePath
                  alt="Génie Civil"
                  fill
                  className="object-cover rounded-lg shadow-lg"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                /> 
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
