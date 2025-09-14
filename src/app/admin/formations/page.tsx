'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ProtectedRoute from '@/components/shared/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, GraduationCap } from 'lucide-react';

interface Education {
  id: number;
  period: string;
  title: string;
  institutions: string[];
  location: string;
  status: string;
  type: string;
  description?: string;
  highlights?: string[];
}

export default function AdminFormations() {
  const [educations, setEducations] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchEducations = async () => {
      try {
        const response = await fetch('/api/education');
        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
        const data = await response.json();
        setEducations(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? `Erreur lors du chargement des formations : ${err.message}`
            : 'Erreur lors du chargement des formations.'
        );
      } finally {
        setLoading(false);
      }
    };
    fetchEducations();
  }, []);

  const handleAdd = () => router.push('/admin/formations/add');
  const handleBack = () => router.push('/admin/dashboard');

  if (loading) return <div className="flex items-center justify-center min-h-screen text-gray-500">Chargement...</div>;
  if (error) return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 sm:p-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-4 sm:space-y-0">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Gérer les Formations</h1>
            <div className="flex space-x-4">
              <Button onClick={handleBack} variant="outline" className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
              <Button onClick={handleAdd} className="bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter une Formation
              </Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {educations.map((edu) => (
              <Card key={edu.id} className="bg-white dark:bg-gray-800 shadow-lg rounded-lg transition-transform transform hover:scale-[1.02] cursor-pointer">
                <CardContent className="p-5 flex items-center space-x-4">
                  <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                    <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{edu.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{edu.period} - {edu.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}