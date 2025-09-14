'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ProtectedRoute from '@/components/shared/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ArrowLeft, PlusCircle } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

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
    setFormData((prev) => ({ ...prev, [name]: name === 'level' || name === 'categoryId' ? Number(value) : value }));
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
          : 'Erreur lors de l\'ajout.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => router.push('/admin/competences');

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 sm:p-10">
        <div className="max-w-xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Ajouter une Compétence</h1>
            <Button onClick={handleBack} variant="outline" className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
          </div>
          <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Nouvelle Compétence</CardTitle>
            </CardHeader>
            <CardContent>
              {error && <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="categoryId">ID Catégorie</Label>
                  <Input
                    id="categoryId"
                    type="number"
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="name">Nom</Label>
                  <Input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="level">Niveau (0-100)</Label>
                  <Input
                    id="level"
                    type="number"
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
                <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 transition-colors">
                  {loading ? 'Ajout...' : <><PlusCircle className="h-4 w-4 mr-2" />Ajouter</>}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}