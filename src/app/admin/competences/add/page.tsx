'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ProtectedRoute from '@/components/shared/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface Skill {
  categoryId: number;
  name: string;
  level: number;
  description?: string;
}

export default function AdminCompetencesAdd() {
  const [formData, setFormData] = useState<Skill>({
    categoryId: 0,
    name: '',
    level: 0,
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === 'level' ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
      toast.success('Compétence ajoutée avec succès !');
      router.push('/admin/competences');
    } catch (err) {
      setError(
        err instanceof Error
          ? `Erreur lors de l'ajout : ${err.message}`
          : 'Erreur lors de l ajout.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="p-6">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">Ajouter une Compétence</h1>
          <Button onClick={() => router.push('/admin/competences')}>Retour</Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Nouvelle Compétence</CardTitle>
          </CardHeader>
          <CardContent>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">ID Catégorie</label>
                <input
                  type="number"
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Nom</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Niveau (0-100)</label>
                <input
                  type="number"
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  min="0"
                  max="100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? 'Ajout...' : 'Ajouter'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}