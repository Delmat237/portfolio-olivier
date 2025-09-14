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
    color: 'text-sky-600 bg-sky-100 dark:text-sky-400 dark:bg-sky-900'
  },
  {
    title: 'Messages reçus',
    value: '45',
    change: '+8%',
    icon: Mail,
    color: 'text-teal-600 bg-teal-100 dark:text-teal-400 dark:bg-teal-900'
  },
  {
    title: 'Projets actifs',
    value: '3',
    change: '0%',
    icon: Briefcase,
    color: 'text-indigo-600 bg-indigo-100 dark:text-indigo-400 dark:bg-indigo-900'
  },
  {
    title: 'Formations',
    value: '6',
    change: '+1',
    icon: BookOpen,
    color: 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900'
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        {/* Header */}
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="px-6 py-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Tableau de bord
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Bienvenue, {user?.name || 'Administrateur'}
                </p>
              </div>
              
              <div className="flex items-center gap-4 mt-2 sm:mt-0">
                <span className="text-gray-500 text-sm hidden md:block">
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
                  className="text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900 transition-colors"
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
              <Card key={index} className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">{stat.change}</span>
                      </div>
                    </div>
                    
                    <div className={`w-14 h-14 rounded-full ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-7 h-7" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Activités récentes */}
            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-xl shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-bold">
                  <Calendar className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                  Activités récentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl transition-transform transform hover:translate-x-1">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-gray-900 shadow">
                        <activity.icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {activity.content}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions rapides */}
            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Actions rapides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={() => handleNavigate('formations')}
                    className="h-24 flex-col justify-center items-center rounded-xl bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-400 hover:bg-sky-100 dark:hover:bg-sky-900 transition-colors border-2 border-sky-200 dark:border-sky-800"
                  >
                    <BookOpen className="w-7 h-7 mb-2" />
                    <span className="text-sm font-semibold">Gérer Formations</span>
                  </Button>
                  
                  <Button
                    onClick={() => handleNavigate('projets')}
                    className="h-24 flex-col justify-center items-center rounded-xl bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-400 hover:bg-teal-100 dark:hover:bg-teal-900 transition-colors border-2 border-teal-200 dark:border-teal-800"
                  >
                    <Briefcase className="w-7 h-7 mb-2" />
                    <span className="text-sm font-semibold">Gérer Projets</span>
                  </Button>
                  
                  <Button
                    onClick={() => handleNavigate('competences')}
                    className="h-24 flex-col justify-center items-center rounded-xl bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors border-2 border-indigo-200 dark:border-indigo-800"
                  >
                    <Settings className="w-7 h-7 mb-2" />
                    <span className="text-sm font-semibold">Compétences</span>
                  </Button>
                  
                  <Button
                    onClick={() => handleNavigate('messages')}
                    className="h-24 flex-col justify-center items-center rounded-xl bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900 transition-colors border-2 border-orange-200 dark:border-orange-800"
                  >
                    <Mail className="w-7 h-7 mb-2" />
                    <span className="text-sm font-semibold">Messages</span>
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