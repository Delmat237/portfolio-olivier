'use client';

import { useState, useEffect } from 'react';
import { 
  Users, 
  BookOpen, 
  Briefcase, 
  Mail, 
  TrendingUp, 
  Calendar,
  Eye,
  Settings,
  LogOut
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ProtectedRoute from '@/components/shared/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const statsCards = [
  {
    title: 'Visiteurs ce mois',
    value: '1,234',
    change: '+12%',
    icon: Users,
    color: 'text-blue-600 bg-blue-100'
  },
  {
    title: 'Messages reçus',
    value: '45',
    change: '+8%',
    icon: Mail,
    color: 'text-green-600 bg-green-100'
  },
  {
    title: 'Projets actifs',
    value: '3',
    change: '0%',
    icon: Briefcase,
    color: 'text-purple-600 bg-purple-100'
  },
  {
    title: 'Formations',
    value: '6',
    change: '+1',
    icon: BookOpen,
    color: 'text-orange-600 bg-orange-100'
  }
];

const recentActivities = [
  {
    id: 1,
    type: 'message',
    content: 'Nouveau message de Jean Dupont',
    time: 'Il y a 2 heures',
    icon: Mail
  },
  {
    id: 2,
    type: 'view',
    content: 'Page "Projets" consultée 15 fois',
    time: 'Il y a 4 heures',
    icon: Eye
  },
  {
    id: 3,
    type: 'update',
    content: 'Profil mis à jour',
    time: 'Il y a 1 jour',
    icon: Settings
  }
];

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulation du chargement des données
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success('Déconnexion réussie !', {
      description: 'Redirection vers l\'accueil...',
    });
    router.push('/');
  };

  const handleNavigate = (path: string) => {
    router.push(`/admin/${path}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Tableau de bord
                </h1>
                <p className="text-gray-600">
                  Bienvenue, {user?.name || 'Administrateur'}
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-gray-500 text-sm">
                  {new Date().toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Déconnexion
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsCards.map((stat, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-600">{stat.change}</span>
                      </div>
                    </div>
                    
                    <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Activités récentes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Activités récentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                        <activity.icon className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.content}
                        </p>
                        <p className="text-xs text-gray-500">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions rapides */}
            <Card>
              <CardHeader>
                <CardTitle>Actions rapides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={() => handleNavigate('formations')}
                    className="h-20 flex-col bg-primary-50 text-primary-700 hover:bg-primary-100 border border-primary-200"
                  >
                    <BookOpen className="w-6 h-6 mb-2" />
                    <span className="text-sm">Gérer Formation</span>
                  </Button>
                  
                  <Button
                    onClick={() => handleNavigate('projets')}
                    className="h-20 flex-col bg-green-50 text-green-700 hover:bg-green-100 border border-green-200"
                  >
                    <Briefcase className="w-6 h-6 mb-2" />
                    <span className="text-sm">Gérer Projets</span>
                  </Button>
                  
                  <Button
                    onClick={() => handleNavigate('competences')}
                    className="h-20 flex-col bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200"
                  >
                    <Settings className="w-6 h-6 mb-2" />
                    <span className="text-sm">Compétences</span>
                  </Button>
                  
                  <Button
                    onClick={() => handleNavigate('messages')}
                    className="h-20 flex-col bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200"
                  >
                    <Mail className="w-6 h-6 mb-2" />
                    <span className="text-sm">Messages</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}