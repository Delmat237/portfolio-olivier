// src/components/sections/Certifications.tsx
'use client'

import {  Download, ExternalLink, Calendar, Building } from 'lucide-react'
import AnimatedSection from '@/components/shared/AnimatedSection'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import certifications from '@/data/certifications'


export default function Certifications() {
  const handleDownloadCertificate = (certId: string) => {
    // Logique de téléchargement du certificat
    console.log(`Téléchargement du certificat ${certId}`)
  }

  return (
    <section id="certifications" className="section-padding bg-gradient-to-br from-slate-50 via-blue-400 to-sky-750">
      <div className="container-custom">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Mes <span className="gradient-text">Certifications</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Un parcours académique rigoureux marqué par l&apos;obtention de diplômes 
              et certifications reconnus, témoins de mon engagement envers l&apos;excellence.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <AnimatedSection key={cert.id} delay={index * 100}>
              <Card className="group hover:shadow-xl transition-all duration-300 h-full">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-r ${cert.color} group-hover:scale-110 transition-transform duration-200`}>
                      <cert.icon className="w-7 h-7 text-white" />
                    </div>
                    
                    {cert.verified && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Vérifié
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                      {cert.type}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
                    {cert.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-3">
                    {cert.description}
                  </p>
                  
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      <span>{cert.institution}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{cert.year} • {cert.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-4 border-t border-gray-100">
                    <Button
                      onClick={() => handleDownloadCertificate(cert.id)}
                      variant="outline"
                      size="sm"
                      className="flex-1 border-primary-200 text-primary-600 hover:bg-primary-50"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Télécharger
                    </Button>
                    
                    <Button
                      size="sm"
                      className="bg-primary-600 hover:bg-primary-700 text-white"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        {/* Statistiques */}
        <AnimatedSection>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl">
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {certifications.length}
              </div>
              <div className="text-gray-600">Certifications</div>
            </div>
            
            <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {certifications.filter(c => c.verified).length}
              </div>
              <div className="text-gray-600">Vérifiées</div>
            </div>
            
            <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {new Date().getFullYear() - 2013}
              </div>
              <div className="text-gray-600">Années d&apos;études</div>
            </div>
            
            <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {[...new Set(certifications.map(c => c.institution))].length}
              </div>
              <div className="text-gray-600">Institutions</div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}