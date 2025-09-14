'use client';

import { useState, useEffect } from 'react';
import { Download, ExternalLink, Calendar, Building } from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import React from 'react'; // Importez React pour utiliser React.ElementType

interface Certification {
  id: number;
  name: string;
  description: string;
  type: string;
  institution: string;
  year: number;
  location: string;
  image: string;
  color: string;
  verified: boolean;
  // CORRECTION : Définition du type de l'icône comme un élément React
  icon?: React.ElementType;
}

export default function Certifications() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const response = await fetch('/api/certifications');
        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
        const data = await response.json();
        setCertifications(data || []);
      } catch (err) {
        setError(
          err instanceof Error
            ? `Une erreur est survenue lors du chargement des certifications : ${err.message}`
            : 'Une erreur est survenue lors du chargement des certifications.'
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCertifications();
  }, []);

  const handleDownloadCertificate = (certId: string) => {
    console.log(`Téléchargement du certificat ${certId}`);
  };

  if (loading) return <div className="text-center py-10 text-gray-700 dark:text-gray-300">Chargement...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <section id="certifications" className="section-padding bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="container-custom">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Mes <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-blue-600">Certifications</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Un parcours académique rigoureux marqué par l&#39;obtention de diplômes
              et certifications reconnus, témoins de mon engagement envers l&#39;excellence.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <AnimatedSection key={cert.id} delay={index * 100}>
              <Card className="group hover:shadow-xl transition-all duration-300 h-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-xl">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-r ${cert.color || 'from-sky-500 to-blue-600'} group-hover:scale-110 transition-transform duration-200`}>
                      {cert.icon ? <cert.icon className="w-7 h-7 text-white" /> : <Building className="w-7 h-7 text-white" />}
                    </div>

                    {cert.verified && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full dark:bg-green-900 dark:text-green-300">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Vérifié
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full dark:bg-gray-800 dark:text-gray-300">
                      {cert.type}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors duration-200">
                    {cert.name}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    {cert.description}
                  </p>

                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                      <span>{cert.institution}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                      <span>{cert.year} • {cert.location}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <Button
                      onClick={() => handleDownloadCertificate(cert.id.toString())}
                      variant="outline"
                      size="sm"
                      className="flex-1 border-gray-300 text-sky-600 hover:bg-sky-50 dark:border-gray-700 dark:text-sky-400 dark:hover:bg-gray-800"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Télécharger
                    </Button>

                    <Button
                      size="sm"
                      className="bg-sky-600 hover:bg-sky-700 text-white dark:bg-sky-700 dark:hover:bg-sky-800"
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
            <div className="text-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="text-3xl font-bold text-sky-600 dark:text-sky-400 mb-2">
                {certifications.length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Certifications</div>
            </div>

            <div className="text-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                {certifications.filter(c => c.verified).length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Vérifiées</div>
            </div>

            <div className="text-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {new Date().getFullYear() - 2013}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Années d&#39;études</div>
            </div>

            <div className="text-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                {[...new Set(certifications.map(c => c.institution))].length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Institutions</div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
