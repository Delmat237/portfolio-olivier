// src/components/sections/Projects.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Building, Calculator, Wrench, ExternalLink, Calendar, Tag, CheckCircle, Clock, Pause, X } from 'lucide-react'
import AnimatedSection from '@/components/shared/AnimatedSection'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getImagePath } from '@/config/images' // Importer la config

// Définition des types pour les données de projet
interface Project {
  id: string;
  title: string;
  description: string;
  category: 'civil' | 'math' | 'technical';
  technologies: string[];
  status: 'completed' | 'current' | 'paused';
  image: string;
  startDate: string;
  endDate?: string;
  highlights: string[];
  detailedDescription: string;
}

const projectCategories = [
  { id: 'all', name: 'Tous les projets', icon: null },
  { id: 'civil', name: 'Génie Civil', icon: Building },
  { id: 'math', name: 'Mathématiques', icon: Calculator },
  { id: 'technical', name: 'Technique', icon: Wrench }
]

const projects: Project[] = [
  {
    id: '1',
    title: "Analyse structurelle d'un pont en béton armé",
    description: "Conception et calcul de résistance pour un pont de 30 mètres de portée, incluant l'analyse des charges permanentes et d'exploitation.",
    category: 'civil',
    technologies: ['AutoCAD', 'Calculs manuels', 'Béton armé', 'RDM'],
    status: 'completed',
    image: getImagePath('/images/projects/pont.jpg'), // Utiliser getImagePath
    startDate: '2023-09',
    endDate: '2023-12',
    highlights: [
      'Dimensionnement des poutres principales',
      'Calcul des charges et surcharges',
      'Vérification de la stabilité',
      "Plans d'exécution détaillés"
    ],
    detailedDescription: "Ce projet académique consistait à concevoir et calculer un pont en béton armé pour franchir une rivière. Le travail comprenait l'étude géotechnique, le dimensionnement des fondations, le calcul des poutres et du tablier, ainsi que la vérification de tous les états limites selon les normes en vigueur."
  },
  {
    id: '2',
    title: "Résolution d'équations différentielles par méthodes numériques",
    description: "Développement d'algorithmes pour résoudre des systèmes d'équations différentielles appliqués à la modélisation de structures dynamiques.",
    category: 'math',
    technologies: ['Python', 'MATLAB', 'Analyse numérique', 'Scipy'],
    status: 'current',
    image: getImagePath('/images/projects/equations.jpg'),
    startDate: '2024-01',
    highlights: [
      'Méthodes de Runge-Kutta',
      'Approximations par différences finies',
      'Validation des résultats',
      'Interface graphique interactive'
    ],
    detailedDescription: "Projet de recherche sur l'application des méthodes numériques avancées pour résoudre des équations différentielles ordinaires et partielles. Focus sur les applications en génie civil, notamment la dynamique des structures et l'analyse vibratoire."
  },
  {
    id: '3',
    title: "Système de gestion des eaux pluviales urbaines",
    description: "Conception d'un système de drainage pour un quartier résidentiel, incluant dimensionnement des caniveaux et bassins de rétention.",
    category: 'civil',
    technologies: ['Hydraulique urbaine', 'Topographie', 'AutoCAD', 'Calculs hydrologiques'],
    status: 'completed',
    image: getImagePath('/images/projects/drainage.jpg'),
    startDate: '2023-03',
    endDate: '2023-06',
    highlights: [
      'Étude hydrologique du bassin versant',
      'Dimensionnement des ouvrages',
      'Calcul des débits de pointe',
      'Plans de réseaux'
    ],
    detailedDescription: "Étude complète d'aménagement urbain pour la gestion des eaux pluviales d'un quartier de 500 habitants. Analyse des précipitations, calcul des débits, dimensionnement des canalisations et conception de bassins de rétention."
  },
  {
    id: '4',
    title: "Optimisation topologique de structures",
    description: "Application d'algorithmes d'optimisation pour réduire le poids des structures tout en maintenant leur résistance mécanique.",
    category: 'math',
    technologies: ['Python', 'Optimisation', 'Éléments finis', 'Algorithmes génétiques'],
    status: 'current',
    image: getImagePath('/images/projects/optimization.jpg'),
    startDate: '2024-02',
    highlights: [
      "Algorithmes d'optimisation topologique",
      "Analyse par éléments finis",
      'Réduction de masse de 30%',
      'Validation expérimentale'
    ],
    detailedDescription: "Recherche sur l'optimisation de la forme et de la topologie des structures en béton armé et acier. Utilisation d'algorithmes bio-inspirés pour minimiser le poids tout en respectant les contraintes de résistance et de déformation."
  },
  {
    id: '5',
    title: "Installation électrique d'un bâtiment résidentiel",
    description: "Conception et réalisation complète de l'installation électrique d'une maison individuelle selon les normes camerounaises.",
    category: 'technical',
    technologies: ['Électricité bâtiment', 'Schémas électriques', 'Normes NF C 15-100', 'Câblage'],
    status: 'completed',
    image: getImagePath('/images/projects/electrical.jpg'),
    startDate: '2023-07',
    endDate: '2023-08',
    highlights: [
      'Schémas unifilaires et multifilaires',
      'Dimensionnement des protections',
      'Mise en œuvre pratique',
      'Respect des normes de sécurité'
    ],
    detailedDescription: "Projet pratique de conception et réalisation d'une installation électrique domestique. Travail complet depuis l'étude des besoins jusqu'à la mise en service, en passant par les calculs de dimensionnement et la réalisation des schémas."
  },
  {
    id: '6',
    title: "Forage et aménagement de puits",
    description: "Conception et supervision d'un projet de forage d'eau potable pour une communauté rurale, incluant l'étude hydrogéologique.",
    category: 'technical',
    technologies: ['Hydrogéologie', 'Techniques de forage', 'Pompage', 'Traitement d\'eau'],
    status: 'completed',
    image: getImagePath('/images/projects/forage.jpg'),
    startDate: '2023-05',
    endDate: '2023-07',
    highlights: [
      'Étude hydrogéologique préalable',
      'Supervision du forage',
      'Installation de la pompe',
      'Formation des utilisateurs'
    ],
    detailedDescription: "Projet communautaire de réalisation d'un forage d'eau potable pour un village de 200 habitants. Coordination avec les entreprises de forage, supervision technique, et mise en place d'un système de maintenance durable."
  }
]

const statusConfig = {
  completed: { label: 'Terminé', icon: CheckCircle, color: 'text-green-600 bg-green-100' },
  current: { label: 'En cours', icon: Clock, color: 'text-blue-600 bg-blue-100' },
  paused: { label: 'En pause', icon: Pause, color: 'text-yellow-600 bg-yellow-100' }
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(project => project.category === activeCategory)

  const formatDate = (dateStr: string) => {
    const [year, month] = dateStr.split('-')
    const months = [
      'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin',
      'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'
    ]
    return `${months[parseInt(month) - 1]} ${year}`
  }

  return (
    <section id="projects" className="section-padding bg-sky-500">
      <div className="container-custom">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Mes <span className="gradient-text">Projets</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Découvrez une sélection de mes réalisations en génie civil, mathématiques appliquées
              et projets techniques. Chaque projet reflète ma passion pour l&apos;innovation et l&apos;excellence.
            </p>
          </div>
        </AnimatedSection>

        {/* Filtres par catégorie */}
        <AnimatedSection>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {projectCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeCategory === category.id
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-primary-50 hover:text-primary-600'
                }`}
              >
                {category.icon && <category.icon className="w-4 h-4" />}
                {category.name}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Grille des projets */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => {
            const StatusIcon = statusConfig[project.status].icon;
            return (
              <AnimatedSection key={project.id} delay={index * 100}>
                <Card className="group hover:shadow-2xl transition-all duration-300 overflow-hidden h-full">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image} // Image déjà passée par getImagePath
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />

                    {/* Status badge */}
                    <div className="absolute top-4 left-4">
                      <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusConfig[project.status].color}`}>
                        {StatusIcon && <StatusIcon className="w-3 h-3" />}
                        {statusConfig[project.status].label}
                      </div>
                    </div>

                    {/* Category badge */}
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 text-xs font-medium text-gray-700">
                        <Tag className="w-3 h-3" />
                        {projectCategories.find(cat => cat.id === project.category)?.name}
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-200">
                        {project.title}
                      </h3>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-md">
                            +{project.technologies.length - 3} autres
                          </span>
                        )}
                      </div>

                      {/* Timeline */}
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {formatDate(project.startDate)}
                          {project.endDate && ` - ${formatDate(project.endDate)}`}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-4 border-t border-gray-100">
                      <Button
                        onClick={() => setSelectedProject(project)}
                        variant="outline"
                        size="sm"
                        className="flex-1 border-primary-200 text-primary-600 hover:bg-primary-50"
                      >
                        Détails
                      </Button>

                      {project.status === 'completed' && (
                        <Link href={""} passHref>
                          <Button
                            size="sm"
                            className="bg-primary-600 hover:bg-primary-700 text-white"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Modal de détails du projet */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedProject(null)}>
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="relative h-64 md:h-80">
                <Image
                  src={selectedProject.image} // Image déjà passée par getImagePath
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 896px"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors duration-200"
                >
                  <X className="w-6 h-6 text-gray-700"/>
                </button>
              </div>

              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {selectedProject.title}
                    </h3>
                    <div className="flex items-center flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(selectedProject.startDate)}
                        {selectedProject.endDate && ` - ${formatDate(selectedProject.endDate)}`}
                      </div>
                      <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusConfig[selectedProject.status].color}`}>
                        {statusConfig[selectedProject.status].icon && (
                          (() => {
                            const StatusIcon = statusConfig[selectedProject.status].icon;
                            return <StatusIcon className="w-3 h-3" />;
                          })()
                        )}
                        {statusConfig[selectedProject.status].label}
                      </div>
                      <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-700">
                        <Tag className="w-3 h-3" />
                        {projectCategories.find(cat => cat.id === selectedProject.category)?.name}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <p className="text-gray-700 leading-relaxed">
                    {selectedProject.detailedDescription}
                  </p>
                </div>

                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Points clés</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedProject.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0 text-primary-600" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Technologies et Outils</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-4 border-t pt-4">
                  <Button
                    onClick={() => setSelectedProject(null)}
                    variant="outline"
                    className="flex-1 sm:flex-none"
                  >
                    Fermer
                  </Button>
                  {selectedProject.status === 'completed' && (
                    <Link href={""} passHref>
                      <Button
                        className="flex-1 sm:flex-none"
                      >
                        Voir le projet <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}