import { GraduationCap, Award, Building, Calculator } from 'lucide-react'

const educationData = [
  {
    id: 'current',
    period: '2024-2025',
    title: 'Master 2 en Mathématiques & 3ème année Génie Civil',
    institutions: [
      'Université de Yaoundé I (Master 2 Mathématiques option Analyse et Applications)',
      'École Nationale Supérieure Polytechnique de Yaoundé (3ème année Génie Civil)'
    ],
    location: 'Yaoundé, Cameroun',
    status: 'En cours',
    type: 'current',
    icon: GraduationCap,
    description: 'Formation avancée combinant expertise mathématique théorique et application pratique en génie civil.',
    highlights: [
      'Analyse fonctionnelle et équations différentielles',
      'Conception d\'ouvrages en béton armé',
      'Modélisation mathématique des structures',
      'Mécanique des sols et fondations'
    ]
  },
  {
    id: 'master1',
    period: '2023-2024',
    title: 'Master 1 en Mathématiques & MSP 2',
    institutions: [
      'Université de Yaoundé I (Master 1 Mathématiques option Analyse et Applications)',
      'École Nationale Supérieure Polytechnique de Yaoundé (MSP 2)'
    ],
    location: 'Yaoundé, Cameroun',
    status: 'Validé',
    type: 'completed',
    icon: Calculator,
    description: 'Approfondissement des mathématiques appliquées et initiation aux projets d\'ingénierie.',
    highlights: [
      'Analyse numérique et optimisation',
      'Résistance des matériaux',
      'Calcul différentiel et intégral avancé',
      'Introduction aux méthodes de construction'
    ]
  },
  {
    id: 'license3',
    period: '2022-2023',
    title: 'Licence 3 Mathématiques & MSP 1',
    institutions: [
      'Université de Yaoundé I (Licence 3 Mathématiques fondamentales)',
      'École Nationale Supérieure Polytechnique de Yaoundé (MSP 1)'
    ],
    location: 'Yaoundé, Cameroun',
    status: 'Validé',
    type: 'completed',
    icon: Building,
    description: 'Consolidation des bases mathématiques et découverte du génie civil.',
    highlights: [
      'Algèbre linéaire et géométrie',
      'Topographie et dessin technique',
      'Probabilités et statistiques',
      'Matériaux de construction'
    ]
  },
  {
    id: 'license2',
    period: '2021-2022',
    title: 'Licence 2 Mathématiques & Admissions concours',
    institutions: [
      'Université de Yaoundé I (Licence 2 Mathématiques)',
      'École Nationale Supérieure des Travaux Publics (Niveau 1)',
      'Admission École Nationale Supérieure Polytechnique'
    ],
    location: 'Yaoundé, Cameroun',
    status: 'Validé',
    type: 'completed',
    icon: Award,
    description: 'Année charnière avec admission dans les écoles d\'ingénierie prestigieuses.',
    highlights: [
      'Analyse mathématique approfondie',
      'Réussite aux concours d\'entrée',
      'Premiers cours en travaux publics',
      'Développement de la rigueur scientifique'
    ]
  },
  {
    id: 'license1',
    period: '2020-2021',
    title: 'Licence 1 Mathématiques & Admission ENSTP',
    institutions: [
      'Université de Yaoundé I (Licence 1 Mathématiques)',
      'École Nationale Supérieure des Travaux Publics (70e/300 admis)'
    ],
    location: 'Yaoundé, Cameroun',
    status: 'Validé',
    type: 'completed',
    icon: GraduationCap,
    description: 'Début des études supérieures avec un excellent classement au concours ENSTP.',
    highlights: [
      'Bases solides en mathématiques',
      'Excellent classement au concours',
      'Adaptation aux études supérieures',
      'Découverte du monde de l\'ingénierie'
    ]
  }
]

export default educationData;