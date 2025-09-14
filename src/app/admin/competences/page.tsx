'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ProtectedRoute from '@/components/shared/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Brain } from 'lucide-react';

interface SkillCategory {
  id: string;
  title: string;
  skills: { id: number; name: string; level: number }[];
}

export default function AdminCompetences() {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch('/api/skills');
        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
        const data = await response.json();
        setSkillCategories(data || []);
      } catch (err) {
        setError(
          err instanceof Error
            ? `Erreur lors du chargement des compétences : ${err.message}`
            : 'Erreur lors du chargement des compétences.'
        );
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const handleAdd = () => router.push('/admin/competences/add');
  const handleBack = () => router.push('/admin/dashboard');

  if (loading) return <div className="flex items-center justify-center min-h-screen text-gray-500">Chargement...</div>;
  if (error) return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 sm:p-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-4 sm:space-y-0">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Gérer les Compétences</h1>
            <div className="flex space-x-4">
              <Button onClick={handleBack} variant="outline" className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
              <Button onClick={handleAdd} className="bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter une Compétence
              </Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {skillCategories.map((cat) => (
              <Card key={cat.id} className="bg-white dark:bg-gray-800 shadow-lg rounded-lg transition-transform transform hover:scale-[1.02] cursor-pointer">
                <CardHeader className="flex flex-row items-center space-x-4">
                  <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-full">
                    <Brain className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">{cat.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
                    {cat.skills.map((skill) => (
                      <li key={skill.id} className="flex items-center">
                        <span className="flex-1">{skill.name}</span>
                        <span className="text-sm font-semibold ml-2">({skill.level}%)</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}