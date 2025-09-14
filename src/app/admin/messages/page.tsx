'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ProtectedRoute from '@/components/shared/ProtectedRoute';
import { useRouter } from 'next/navigation';

interface Message {
  id: number;
  email: string;
  content: string;
  createdAt: string;
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('/api/messages'); // À implémenter
        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
        const data = await response.json();
        setMessages(data || []);
      } catch (err) {
        setError(
          err instanceof Error
            ? `Erreur lors du chargement des messages : ${err.message}`
            : 'Erreur lors du chargement des messages.'
        );
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  const handleAdd = () => router.push('/admin/messages/add');

  if (loading) return <div className="text-center py-10">Chargement...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <ProtectedRoute>
      <div className="p-6">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">Gérer les Messages</h1>
          <Button onClick={handleAdd}>Ajouter un Message</Button>
        </div>
        <div className="grid gap-4">
          {messages.map((msg) => (
            <Card key={msg.id}>
              <CardContent className="p-4">
                <h3 className="font-semibold">{msg.email}</h3>
                <p>{msg.content.substring(0, 50)}...</p>
                <p className="text-sm text-gray-500">{new Date(msg.createdAt).toLocaleDateString()}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}