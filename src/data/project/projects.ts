
import { getImagePath } from '@/config/images' // Importer la config

// Définition des types pour les données de projet
interface Project {
  id: string;
  title: string;
  description: string;
  category: 'civil' | 'math' | 'technical';
  technologies: string[];
  status: 'completed' | 'current' | 'paused';
  image: string;
  startDate: string;
  endDate?: string;
  highlights: string[];
  detailedDescription: string;
}


const projects: Project[] = [
  {
    id: '1',
    title: "Analyse structurelle d'un pont en béton armé",
    description: "Conception et calcul de résistance pour un pont de 30 mètres de portée, incluant l'analyse des charges permanentes et d'exploitation.",
    category: 'civil',
    technologies: ['AutoCAD', 'Calculs manuels', 'Béton armé', 'RDM'],
    status: 'completed',
    image: getImagePath('/images/projects/pont.jpg'), // Utiliser getImagePath
    startDate: '2023-09',
    endDate: '2023-12',
    highlights: [
      'Dimensionnement des poutres principales',
      'Calcul des charges et surcharges',
      'Vérification de la stabilité',
      "Plans d'exécution détaillés"
    ],
    detailedDescription: "Ce projet académique consistait à concevoir et calculer un pont en béton armé pour franchir une rivière. Le travail comprenait l'étude géotechnique, le dimensionnement des fondations, le calcul des poutres et du tablier, ainsi que la vérification de tous les états limites selon les normes en vigueur."
  },
  {
    id: '2',
    title: "Résolution d'équations différentielles par méthodes numériques",
    description: "Développement d'algorithmes pour résoudre des systèmes d'équations différentielles appliqués à la modélisation de structures dynamiques.",
    category: 'math',
    technologies: ['Python', 'MATLAB', 'Analyse numérique', 'Scipy'],
    status: 'current',
    image: getImagePath('/images/projects/equations.jpg'),
    startDate: '2024-01',
    highlights: [
      'Méthodes de Runge-Kutta',
      'Approximations par différences finies',
      'Validation des résultats',
      'Interface graphique interactive'
    ],
    detailedDescription: "Projet de recherche sur l'application des méthodes numériques avancées pour résoudre des équations différentielles ordinaires et partielles. Focus sur les applications en génie civil, notamment la dynamique des structures et l'analyse vibratoire."
  },
  {
    id: '3',
    title: "Système de gestion des eaux pluviales urbaines",
    description: "Conception d'un système de drainage pour un quartier résidentiel, incluant dimensionnement des caniveaux et bassins de rétention.",
    category: 'civil',
    technologies: ['Hydraulique urbaine', 'Topographie', 'AutoCAD', 'Calculs hydrologiques'],
    status: 'completed',
    image: getImagePath('/images/projects/drainage.jpg'),
    startDate: '2023-03',
    endDate: '2023-06',
    highlights: [
      'Étude hydrologique du bassin versant',
      'Dimensionnement des ouvrages',
      'Calcul des débits de pointe',
      'Plans de réseaux'
    ],
    detailedDescription: "Étude complète d'aménagement urbain pour la gestion des eaux pluviales d'un quartier de 500 habitants. Analyse des précipitations, calcul des débits, dimensionnement des canalisations et conception de bassins de rétention."
  },
  {
    id: '4',
    title: "Optimisation topologique de structures",
    description: "Application d'algorithmes d'optimisation pour réduire le poids des structures tout en maintenant leur résistance mécanique.",
    category: 'math',
    technologies: ['Python', 'Optimisation', 'Éléments finis', 'Algorithmes génétiques'],
    status: 'current',
    image: getImagePath('/images/projects/optimization.jpg'),
    startDate: '2024-02',
    highlights: [
      "Algorithmes d'optimisation topologique",
      "Analyse par éléments finis",
      'Réduction de masse de 30%',
      'Validation expérimentale'
    ],
    detailedDescription: "Recherche sur l'optimisation de la forme et de la topologie des structures en béton armé et acier. Utilisation d'algorithmes bio-inspirés pour minimiser le poids tout en respectant les contraintes de résistance et de déformation."
  },
  {
    id: '5',
    title: "Installation électrique d'un bâtiment résidentiel",
    description: "Conception et réalisation complète de l'installation électrique d'une maison individuelle selon les normes camerounaises.",
    category: 'technical',
    technologies: ['Électricité bâtiment', 'Schémas électriques', 'Normes NF C 15-100', 'Câblage'],
    status: 'completed',
    image: getImagePath('/images/projects/electrical.jpg'),
    startDate: '2023-07',
    endDate: '2023-08',
    highlights: [
      'Schémas unifilaires et multifilaires',
      'Dimensionnement des protections',
      'Mise en œuvre pratique',
      'Respect des normes de sécurité'
    ],
    detailedDescription: "Projet pratique de conception et réalisation d'une installation électrique domestique. Travail complet depuis l'étude des besoins jusqu'à la mise en service, en passant par les calculs de dimensionnement et la réalisation des schémas."
  },
  {
    id: '6',
    title: "Forage et aménagement de puits",
    description: "Conception et supervision d'un projet de forage d'eau potable pour une communauté rurale, incluant l'étude hydrogéologique.",
    category: 'technical',
    technologies: ['Hydrogéologie', 'Techniques de forage', 'Pompage', 'Traitement d\'eau'],
    status: 'completed',
    image: getImagePath('/images/projects/forage.jpg'),
    startDate: '2023-05',
    endDate: '2023-07',
    highlights: [
      'Étude hydrogéologique préalable',
      'Supervision du forage',
      'Installation de la pompe',
      'Formation des utilisateurs'
    ],
    detailedDescription: "Projet communautaire de réalisation d'un forage d'eau potable pour un village de 200 habitants. Coordination avec les entreprises de forage, supervision technique, et mise en place d'un système de maintenance durable."
  }
]

export default projects;