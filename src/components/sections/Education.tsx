'use client'

import { useState } from 'react'
import { GraduationCap, Calendar, MapPin, Award, ChevronDown, Building, Calculator } from 'lucide-react'
import AnimatedSection from '@/components/shared/AnimatedSection'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const educationData = [
  {
    id: 'current',
    period: '2024-2025',
    title: 'Master 2 en Mathématiques & 3ème année Génie Civil',
    institutions: [
      'Université de Yaoundé I (Master 2 Mathématiques option Analyse et Applications)',
      'École Nationale Supérieure Polytechnique de Yaoundé (3ème année Génie Civil)'
    ],
    location: 'Yaoundé, Cameroun',
    status: 'En cours',
    type: 'current',
    icon: GraduationCap,
    description: 'Formation avancée combinant expertise mathématique théorique et application pratique en génie civil.',
    highlights: [
      'Analyse fonctionnelle et équations différentielles',
      'Conception d\'ouvrages en béton armé',
      'Modélisation mathématique des structures',
      'Mécanique des sols et fondations'
    ]
  },
  {
    id: 'master1',
    period: '2023-2024',
    title: 'Master 1 en Mathématiques & MSP 2',
    institutions: [
      'Université de Yaoundé I (Master 1 Mathématiques option Analyse et Applications)',
      'École Nationale Supérieure Polytechnique de Yaoundé (MSP 2)'
    ],
    location: 'Yaoundé, Cameroun',
    status: 'Validé',
    type: 'completed',
    icon: Calculator,
    description: 'Approfondissement des mathématiques appliquées et initiation aux projets d\'ingénierie.',
    highlights: [
      'Analyse numérique et optimisation',
      'Résistance des matériaux',
      'Calcul différentiel et intégral avancé',
      'Introduction aux méthodes de construction'
    ]
  },
  {
    id: 'license3',
    period: '2022-2023',
    title: 'Licence 3 Mathématiques & MSP 1',
    institutions: [
      'Université de Yaoundé I (Licence 3 Mathématiques fondamentales)',
      'École Nationale Supérieure Polytechnique de Yaoundé (MSP 1)'
    ],
    location: 'Yaoundé, Cameroun',
    status: 'Validé',
    type: 'completed',
    icon: Building,
    description: 'Consolidation des bases mathématiques et découverte du génie civil.',
    highlights: [
      'Algèbre linéaire et géométrie',
      'Topographie et dessin technique',
      'Probabilités et statistiques',
      'Matériaux de construction'
    ]
  },
  {
    id: 'license2',
    period: '2021-2022',
    title: 'Licence 2 Mathématiques & Admissions concours',
    institutions: [
      'Université de Yaoundé I (Licence 2 Mathématiques)',
      'École Nationale Supérieure des Travaux Publics (Niveau 1)',
      'Admission École Nationale Supérieure Polytechnique'
    ],
    location: 'Yaoundé, Cameroun',
    status: 'Validé',
    type: 'completed',
    icon: Award,
    description: 'Année charnière avec admission dans les écoles d\'ingénierie prestigieuses.',
    highlights: [
      'Analyse mathématique approfondie',
      'Réussite aux concours d\'entrée',
      'Premiers cours en travaux publics',
      'Développement de la rigueur scientifique'
    ]
  },
  {
    id: 'license1',
    period: '2020-2021',
    title: 'Licence 1 Mathématiques & Admission ENSTP',
    institutions: [
      'Université de Yaoundé I (Licence 1 Mathématiques)',
      'École Nationale Supérieure des Travaux Publics (70e/300 admis)'
    ],
    location: 'Yaoundé, Cameroun',
    status: 'Validé',
    type: 'completed',
    icon: GraduationCap,
    description: 'Début des études supérieures avec un excellent classement au concours ENSTP.',
    highlights: [
      'Bases solides en mathématiques',
      'Excellent classement au concours',
      'Adaptation aux études supérieures',
      'Découverte du monde de l\'ingénierie'
    ]
  }
]

const secondaryEducation = [
  {
    period: '2019-2020',
    title: 'Baccalauréat série C',
    institution: 'Lycée de Mimboman',
    location: 'Yaoundé, Cameroun'
  },
  {
    period: '2017-2019',
    title: 'Seconde C jusqu\'au Probatoire C',
    institution: 'Collège Saint André',
    location: 'Yaoundé, Cameroun'
  },
  {
    period: '2016-2017',
    title: 'BEPC',
    institution: 'Lycée d\'Elig Essono',
    location: 'Yaoundé, Cameroun'
  }
]

export default function Education() {
  const [expandedCard, setExpandedCard] = useState<string | null>('current')
  const [showSecondary, setShowSecondary] = useState(false)

  const toggleCard = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id)
  }

  return (
    <section id="education" className="section-padding bg-gradient-to-br from-slate-50 via-blue-500 to-sky-500">
      <div className="container-custom">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ma <span className="gradient-text">Formation</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Un parcours académique alliant excellence mathématique et expertise technique, 
              dans les meilleures institutions du Cameroun.
            </p>
          </div>
        </AnimatedSection>

        {/* Formation Supérieure */}
        <AnimatedSection>
          <div className="space-y-6 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Formation Supérieure
            </h3>
            
            <div className="relative">
              {/* Ligne de temps */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-civil-500"></div>
              
              <div className="space-y-6">
                {educationData.map((edu, index) => (
                  <div key={edu.id} className="relative">
                    {/* Point sur la timeline */}
                    <div className={`absolute left-6 w-4 h-4 rounded-full border-4 border-white shadow-lg z-10 ${
                      edu.type === 'current' 
                        ? 'bg-primary-500 animate-pulse' 
                        : 'bg-civil-500'
                    }`}></div>
                    
                    {/* Carte de formation */}
                    <Card className="ml-16 hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                      <CardContent className="p-0">
                        <div 
                          className="p-6 cursor-pointer"
                          onClick={() => toggleCard(edu.id)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4 flex-1">
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                edu.type === 'current' 
                                  ? 'bg-gradient-to-r from-primary-500 to-civil-500' 
                                  : 'bg-gradient-to-r from-gray-400 to-gray-600'
                              }`}>
                                <edu.icon className="w-6 h-6 text-white" />
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                                    edu.type === 'current'
                                      ? 'bg-green-100 text-green-700'
                                      : 'bg-blue-100 text-blue-700'
                                  }`}>
                                    {edu.status}
                                  </span>
                                  <span className="flex items-center gap-1 text-sm text-gray-500">
                                    <Calendar className="w-4 h-4" />
                                    {edu.period}
                                  </span>
                                </div>
                                
                                <h4 className="text-xl font-bold text-gray-900 mb-2">
                                  {edu.title}
                                </h4>
                                
                                <div className="space-y-1 mb-3">
                                  {edu.institutions.map((institution, idx) => (
                                    <p key={idx} className="text-gray-600 text-sm">
                                      • {institution}
                                    </p>
                                  ))}
                                </div>
                                
                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                  <MapPin className="w-4 h-4" />
                                  {edu.location}
                                </div>
                              </div>
                            </div>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              className="ml-4"
                            >
                              <ChevronDown 
                                className={`w-4 h-4 transition-transform duration-200 ${
                                  expandedCard === edu.id ? 'rotate-180' : ''
                                }`} 
                              />
                            </Button>
                          </div>
                          
                          {expandedCard === edu.id && (
                            <div className="mt-6 pt-6 border-t border-gray-100 animate-fade-up">
                              <p className="text-gray-600 mb-4">{edu.description}</p>
                              
                              <div>
                                <h5 className="font-semibold text-gray-900 mb-3">Points clés :</h5>
                                <div className="grid md:grid-cols-2 gap-2">
                                  {edu.highlights.map((highlight, idx) => (
                                    <div key={idx} className="flex items-center gap-2">
                                      <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0"></div>
                                      <span className="text-gray-600 text-sm">{highlight}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Formation Secondaire */}
        <AnimatedSection>
          <div className="text-center mb-8">
            <Button
              onClick={() => setShowSecondary(!showSecondary)}
              variant="outline"
              className="border-primary-600 text-primary-600 hover:bg-primary-50"
            >
              {showSecondary ? 'Masquer' : 'Voir'} la formation secondaire
              <ChevronDown className={`w-4 h-4 ml-2 transition-transform duration-200 ${showSecondary ? 'rotate-180' : ''}`} />
            </Button>
          </div>

          {showSecondary && (
            <div className="animate-fade-up">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Formation Secondaire
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                {secondaryEducation.map((edu, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-gray-400 to-gray-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <GraduationCap className="w-6 h-6 text-white" />
                      </div>
                      
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                        {edu.period}
                      </span>
                      
                      <h4 className="text-lg font-bold text-gray-900 mt-3 mb-2">
                        {edu.title}
                      </h4>
                      
                      <p className="text-gray-600 text-sm mb-2">{edu.institution}</p>
                      
                      <div className="flex items-center justify-center gap-1 text-sm text-gray-500">
                        <MapPin className="w-4 h-4" />
                        {edu.location}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </AnimatedSection>

        {/* Statistiques de formation */}
        <AnimatedSection>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl">
              <div className="text-3xl font-bold text-primary-600 mb-2">5+</div>
              <div className="text-gray-600">Années d&apos;études supérieures</div>
            </div>
            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl">
              <div className="text-3xl font-bold text-civil-600 mb-2">2</div>
              <div className="text-gray-600">Écoles d&apos;ingénierie</div>
            </div>
            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl">
              <div className="text-3xl font-bold text-math-600 mb-2">7</div>
              <div className="text-gray-600">Diplômes obtenus</div>
            </div>
            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl">
              <div className="text-3xl font-bold text-green-600 mb-2">70e</div>
              <div className="text-gray-600">Classement ENSTP</div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}