'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ProtectedRoute from '@/components/shared/ProtectedRoute';
import { useRouter } from 'next/navigation';

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

  if (loading) return <div className="text-center py-10">Chargement...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <ProtectedRoute>
      <div className="p-6">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">Gérer les Compétences</h1>
          <Button onClick={handleAdd}>Ajouter une Compétence</Button>
        </div>
        <div className="grid gap-4">
          {skillCategories.map((cat) => (
            <Card key={cat.id}>
              <CardContent className="p-4">
                <h3 className="font-semibold">{cat.title}</h3>
                <ul>
                  {cat.skills.map((skill) => (
                    <li key={skill.id}>{skill.name} ({skill.level}%)</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}