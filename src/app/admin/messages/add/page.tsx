'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ProtectedRoute from '@/components/shared/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface Message {
  email: string;
  content: string;
}

export default function AdminMessagesAdd() {
  const [formData, setFormData] = useState<Message>({
    email: '',
    content: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
      toast.success('Message ajouté avec succès !');
      router.push('/admin/messages');
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
          <h1 className="text-2xl font-bold">Ajouter un Message</h1>
          <Button onClick={() => router.push('/admin/messages')}>Retour</Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Nouveau Message</CardTitle>
          </CardHeader>
          <CardContent>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contenu</label>
                <textarea
                  name="content"
                  value={formData.content}
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