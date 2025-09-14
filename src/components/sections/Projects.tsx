'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Building, Calculator, Wrench, Users, BookOpen, Zap, ChevronRight, ExternalLink, Calendar, Tag, CheckCircle, Clock, Pause, X, type LucideIcon } from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Interfaces pour typer les données
interface Project {
  id: number;
  title: string;
  description: string;
  category: string; // Changé en 'string' pour la flexibilité
  technologies: string[];
  status: 'completed' | 'current' | 'paused';
  image: string;
  startDate: string;
  endDate?: string;
  highlights: string[];
  detailedDescription: string;
  link?: string;
}

interface ProjectCategory {
  id: string;
  name: string;
  icon: string; // L'icône est maintenant une chaîne de caractères
}

// Mappage des noms d'icônes aux composants Lucide React
const iconMap: { [key: string]: LucideIcon } = {
  Building: Building,
  Calculator: Calculator,
  Wrench: Wrench,
  Users: Users,
  BookOpen: BookOpen,
  Zap: Zap,
  ChevronRight: ChevronRight,
  // Ajoutez d'autres icônes si nécessaire
};

// Mappage des configurations de statut
const statusConfig = {
  completed: { label: 'Terminé', icon: CheckCircle, color: 'text-green-600 bg-green-100' },
  current: { label: 'En cours', icon: Clock, color: 'text-blue-600 bg-blue-100' },
  paused: { label: 'En pause', icon: Pause, color: 'text-yellow-600 bg-yellow-100' },
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<ProjectCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
        const data = await response.json();
        setProjects(data.projects || []);
        setCategories(data.categories || []);
      } catch (err) {
        setError(
          err instanceof Error
            ? `Une erreur est survenue lors du chargement des projets : ${err.message}`
            : 'Une erreur est survenue lors du chargement des projets.'
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  const formatDate = (dateStr: string) => {
    const [year, month] = dateStr.split('-');
    const months = [
      'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin',
      'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'
    ];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  if (loading) return <div className="text-center py-10">Chargement...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

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
              et projets techniques. Chaque projet reflète ma passion pour l&#39;innovation et l&#39;excellence.
            </p>
          </div>
        </AnimatedSection>

        {/* Filtres par catégorie */}
        <AnimatedSection>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              key="all"
              onClick={() => setActiveCategory('all')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${activeCategory === 'all'
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-primary-50 hover:text-primary-600'
                }`}
            >
              Tous
            </button>
            {categories.length > 0 ? (
              categories.map((category) => {
                const IconComponent = iconMap[category.icon];
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${activeCategory === category.id
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-primary-50 hover:text-primary-600'
                      }`}
                  >
                    {IconComponent && <IconComponent className="w-4 h-4" />}
                    {category.name}
                  </button>
                );
              })
            ) : (
              <p className="text-gray-600">Aucune catégorie disponible.</p>
            )}
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
                      src={project.image || '/images/default.jpg'}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/default.jpg';
                      }}
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
                        {categories.find(cat => cat.id === project.category)?.name || project.category}
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
                      {project.status === 'completed' && project.link && (
                        <Link href={project.link} passHref>
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
                  src={selectedProject.image || '/images/default.jpg'}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 896px"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/default.jpg';
                  }}
                />
                <Button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors duration-200"
                >
                  <X className="w-6 h-6 text-gray-700" />
                </Button>
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
                        {(() => {
                          const StatusIcon = statusConfig[selectedProject.status].icon;
                          return StatusIcon && <StatusIcon className="w-3 h-3" />;
                        })()}
                        {statusConfig[selectedProject.status].label}
                      </div>
                      <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-700">
                        <Tag className="w-3 h-3" />
                        {categories.find(cat => cat.id === selectedProject.category)?.name || selectedProject.category}
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
                  {selectedProject.status === 'completed' && selectedProject.link && (
                    <Link href={selectedProject.link} passHref>
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
  );
}