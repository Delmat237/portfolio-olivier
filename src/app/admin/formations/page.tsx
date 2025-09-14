'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ProtectedRoute from '@/components/shared/ProtectedRoute';
import { useRouter } from 'next/navigation';

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

  if (loading) return <div className="text-center py-10">Chargement...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <ProtectedRoute>
      <div className="p-6">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">Gérer les Formations</h1>
          <Button onClick={handleAdd}>Ajouter une Formation</Button>
        </div>
        <div className="grid gap-4">
          {educations.map((edu) => (
            <Card key={edu.id}>
              <CardContent className="p-4">
                <h3 className="font-semibold">{edu.title}</h3>
                <p>{edu.period} - {edu.location}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}