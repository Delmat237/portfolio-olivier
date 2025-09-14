'use client';

import { useState, useEffect } from 'react';
import { Building, Calculator, Wrench, Users, BookOpen, Zap, ChevronRight, type LucideIcon } from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { Card, CardContent } from '@/components/ui/card';
import React from 'react';

// Interfaces pour typer les données
interface Skill {
  id: number;
  name: string;
  level: number;
  description?: string;
}

interface SkillCategory {
  id: string;
  title: string;
  color: string;
  bgColor: string;
  icon: string; // L'icône est maintenant une chaîne de caractères
  skills: Skill[];
}

interface Certification {
  type: string;
  name: string;
  institution: string;
  year: number;
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

export default function Skills() {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [activeCategory, setActiveCategory] = useState('civil-engineering');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [skillsResponse, certsResponse] = await Promise.all([
          fetch('/api/skills'),
          fetch('/api/certifications'),
        ]);
        if (!skillsResponse.ok) throw new Error(`Erreur HTTP skills: ${skillsResponse.status}`);
        if (!certsResponse.ok) throw new Error(`Erreur HTTP certs: ${certsResponse.status}`);
        const skillsData = await skillsResponse.json();
        const certsData = await certsResponse.json();
        setSkillCategories(skillsData || []);
        setCertifications(certsData || []);
      } catch (err) {
        setError(
          err instanceof Error
            ? `Une erreur est survenue lors du chargement des données : ${err.message}`
            : 'Une erreur est survenue lors du chargement des données.'
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const activeSkillCategory = skillCategories.find((cat) => cat.id === activeCategory);

  if (loading) return <div className="text-center py-10">Chargement...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <section id="skills" className="section-padding bg-sky-600">
      <div className="container-custom">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Mes <span className="gradient-text">Compétences</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Un ensemble de compétences techniques et transversales acquises au fil
              de ma formation et de mes expériences pratiques.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Navigation des catégories */}
          <AnimatedSection>
            <div className="lg:col-span-1">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Catégories</h3>
              <div className="space-y-2">
                {skillCategories.map((category) => {
                  const IconComponent = iconMap[category.icon];
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full text-left p-4 rounded-lg transition-all duration-200 group ${
                        activeCategory === category.id
                          ? 'bg-primary-50 border-2 border-primary-200'
                          : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-r ${category.color}`}>
                          {IconComponent && <IconComponent className="w-5 h-5 text-white" />}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 group-hover:text-primary-600">
                            {category.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {category.skills.length} compétences
                          </p>
                        </div>
                        <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                          activeCategory === category.id ? 'rotate-90' : 'group-hover:translate-x-1'
                        }`} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </AnimatedSection>

          {/* Affichage des compétences */}
          <AnimatedSection>
            <div className="lg:col-span-3">
              {activeSkillCategory && (
                <div className="space-y-6">
                  {/* En-tête de catégorie */}
                  <div className={`p-6 rounded-xl bg-gradient-to-r ${activeSkillCategory.bgColor} border border-gray-100`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-xl flex items-center justify-center bg-gradient-to-r ${activeSkillCategory.color}`}>
                        {iconMap[activeSkillCategory.icon] && React.createElement(iconMap[activeSkillCategory.icon], { className: "w-8 h-8 text-white" })}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {activeSkillCategory.title}
                        </h3>
                        <p className="text-gray-600 mt-1">
                          {activeSkillCategory.skills.length} compétences dans ce domaine
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Liste des compétences */}
                  <div className="grid gap-4">
                    {activeSkillCategory.skills.map((skill, index) => (
                      <Card
                        key={index}
                        className="hover:shadow-lg transition-all duration-300 cursor-pointer"
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <CardContent className="p-6">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <h4 className="text-lg font-semibold text-gray-900">
                                {skill.name}
                              </h4>
                              <span className="text-sm font-medium text-primary-600">
                                {skill.level}%
                              </span>
                            </div>

                            {/* Barre de progression */}
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full bg-gradient-to-r ${activeSkillCategory.color} transition-all duration-1000 ease-out`}
                                style={{
                                  width: hoveredSkill === skill.name ? `${skill.level}%` : '0%',
                                }}
                              ></div>
                            </div>

                            <p className="text-gray-600 text-sm">
                              {skill.description}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>

        {/* Section Certifications */}
        <AnimatedSection>
          <div className="mt-20">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Certifications & <span className="gradient-text">Diplômes</span>
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Reconnaissance officielle de mes compétences et qualifications académiques.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-civil-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <BookOpen className="w-8 h-8 text-white" />
                    </div>

                    <span className="px-3 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
                      {cert.type}
                    </span>

                    <h4 className="text-lg font-bold text-gray-900 mt-4 mb-2">
                      {cert.name}
                    </h4>

                    <p className="text-gray-600 text-sm mb-2">
                      {cert.institution}
                    </p>

                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                      <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                      {cert.year}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Statistiques des compétences */}
        <AnimatedSection>
          <div className="mt-16 p-8 bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Aperçu de mes <span className="gradient-text">Compétences</span>
              </h3>
              <p className="text-gray-600">
                Répartition de mon expertise par domaine
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-gradient-to-r from-civil-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Building className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-civil-600 mb-1">77%</div>
                <div className="text-sm text-gray-600">Génie Civil</div>
              </div>

              <div className="text-center p-4">
                <div className="w-16 h-16 bg-gradient-to-r from-math-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calculator className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-math-600 mb-1">80%</div>
                <div className="text-sm text-gray-600">Mathématiques</div>
              </div>

              <div className="text-center p-4">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Wrench className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-orange-600 mb-1">72%</div>
                <div className="text-sm text-gray-600">Technique</div>
              </div>

              <div className="text-center p-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-green-600 mb-1">81%</div>
                <div className="text-sm text-gray-600">Transversales</div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Call to action */}
        <AnimatedSection>
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 p-6 bg-gradient-to-r from-primary-500 to-civil-500 rounded-2xl text-white">
              <Zap className="w-6 h-6" />
              <div>
                <p className="text-lg font-semibold mb-1">Prêt pour de nouveaux défis</p>
                <p className="text-primary-100">
                  Toujours en apprentissage, toujours en évolution
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}