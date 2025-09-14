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

interface Education {
  period: string;
  title: string;
  institutions: string[];
  location: string;
  status: string;
  type: string;
  description?: string;
  highlights?: string[];
}

export default function AdminFormationsAdd() {
  const [formData, setFormData] = useState<Education>({
    period: '',
    title: '',
    institutions: [''],
    location: '',
    status: '',
    type: '',
    description: '',
    highlights: [''],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: 'institutions' | 'highlights') => {
    const newArray = [...formData[field]];
    newArray[index] = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: newArray }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/education', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
      toast.success('Formation ajoutée avec succès !');
      router.push('/admin/formations');
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

  const handleBack = () => router.push('/admin/formations');

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 sm:p-10">
        <div className="max-w-xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Ajouter une Formation</h1>
            <Button onClick={handleBack} variant="outline" className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
          </div>
          <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Nouvelle Formation</CardTitle>
            </CardHeader>
            <CardContent>
              {error && <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="period">Période</Label>
                  <Input
                    id="period"
                    type="text"
                    name="period"
                    value={formData.period}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="title">Titre</Label>
                  <Input
                    id="title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="institutions">Institutions</Label>
                  <Input
                    id="institutions"
                    type="text"
                    value={formData.institutions[0]}
                    onChange={(e) => handleArrayChange(e, 0, 'institutions')}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="location">Lieu</Label>
                  <Input
                    id="location"
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="status">Statut</Label>
                  <Input
                    id="status"
                    type="text"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Input
                    id="type"
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
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
                <div>
                  <Label htmlFor="highlights">Points forts</Label>
                  <Textarea
                    id="highlights"
                    value={formData.highlights[0]}
                    onChange={(e) => handleArrayChange(e as React.ChangeEvent<HTMLInputElement>, 0, 'highlights')}
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