'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ProtectedRoute from '@/components/shared/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface Project {
  title: string;
  description: string;
  category: string;
  technologies: string[];
  status: string;
  image: string;
}

export default function AdminProjetsAdd() {
  const [formData, setFormData] = useState<Project>({
    title: '',
    description: '',
    category: '',
    technologies: [''],
    status: '',
    image: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: 'technologies') => {
    const newArray = [...formData[field]];
    newArray[index] = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: newArray }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
      toast.success('Projet ajouté avec succès !');
      router.push('/admin/projets');
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
          <h1 className="text-2xl font-bold">Ajouter un Projet</h1>
          <Button onClick={() => router.push('/admin/projets')}>Retour</Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Nouveau Projet</CardTitle>
          </CardHeader>
          <CardContent>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Titre</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
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
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Catégorie</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Technologies</label>
                <input
                  type="text"
                  value={formData.technologies[0]}
                  onChange={(e) => handleArrayChange(e, 0, 'technologies')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Statut</label>
                <input
                  type="text"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Image</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  required
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