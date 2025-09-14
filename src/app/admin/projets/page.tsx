'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ProtectedRoute from '@/components/shared/ProtectedRoute';
import { useRouter } from 'next/navigation';

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  status: string;
  image: string;
}

export default function AdminProjets() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
        const data = await response.json();
        setProjects(data.projects || []);
      } catch (err) {
        setError(
          err instanceof Error
            ? `Erreur lors du chargement des projets : ${err.message}`
            : 'Erreur lors du chargement des projets.'
        );
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleAdd = () => router.push('/admin/projets/add');

  if (loading) return <div className="text-center py-10">Chargement...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <ProtectedRoute>
      <div className="p-6">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">Gérer les Projets</h1>
          <Button onClick={handleAdd}>Ajouter un Projet</Button>
        </div>
        <div className="grid gap-4">
          {projects.map((proj) => (
            <Card key={proj.id}>
              <CardContent className="p-4">
                <h3 className="font-semibold">{proj.title}</h3>
                <p>{proj.description.substring(0, 50)}...</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}