'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ProtectedRoute from '@/components/shared/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Mail } from 'lucide-react';

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

  const handleBack = () => router.push('/admin/dashboard');

  if (loading) return <div className="flex items-center justify-center min-h-screen text-gray-500">Chargement...</div>;
  if (error) return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 sm:p-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-4 sm:space-y-0">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Gérer les Messages</h1>
            <div className="flex space-x-4">
              <Button onClick={handleBack} variant="outline" className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
              {/* Le bouton Ajouter un Message a été retiré car il est rare d'ajouter un message manuellement depuis l'admin. */}
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {messages.map((msg) => (
              <Card key={msg.id} className="bg-white dark:bg-gray-800 shadow-lg rounded-lg transition-transform transform hover:scale-[1.02] cursor-pointer">
                <CardHeader className="flex flex-row items-center space-x-4">
                  <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">{msg.email}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{msg.content.substring(0, 150)}...</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">Reçu le : {new Date(msg.createdAt).toLocaleDateString()} à {new Date(msg.createdAt).toLocaleTimeString()}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}