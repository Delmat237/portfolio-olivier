import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Insérer les catégories de compétences
  const skillCategories = [
    {
      id: 1,
      title: 'Génie Civil',
      icon: '', // Ignoré dans la base
      color: 'from-civil-500 to-blue-600',
      bgColor: 'from-civil-50 to-blue-50',
    },
    {
      id: 2,
      title: 'Mathématiques',
      icon: '', // Ignoré dans la base
      color: 'from-math-500 to-purple-600',
      bgColor: 'from-math-50 to-purple-50',
    },
    {
      id: 3,
      title: 'Compétences techniques',
      icon: '', // Ignoré dans la base
      color: 'from-orange-500 to-red-600',
      bgColor: 'from-orange-50 to-red-50',
    },
    {
      id: 4,
      title: 'Compétences transversales',
      icon: '', // Ignoré dans la base
      color: 'from-green-500 to-teal-600',
      bgColor: 'from-green-50 to-teal-50',
    },
  ];
  await prisma.skillCategory.createMany({ data: skillCategories });

  // Récupérer les IDs des catégories
  const categories = await prisma.skillCategory.findMany();
  const categoryMap = {
    'civil-engineering': categories.find(c => c.id === 1)!.id,
    'mathematics': categories.find(c => c.id === 2)!.id,
    'technical': categories.find(c => c.id === 3)!.id,
    'soft-skills': categories.find(c => c.id === 4)!.id,
  };

  // Insérer les compétences
  const skillsData = [
    ...skillCategories.find(c => c.id ===1) ? [
      { categoryId: categoryMap['civil-engineering'], name: 'Maçonnerie', level: 85, description: 'Construction et rénovation, techniques traditionnelles et modernes' },
      { categoryId: categoryMap['civil-engineering'], name: 'Plomberie', level: 80, description: 'Installation et maintenance des systèmes hydrauliques' },
      { categoryId: categoryMap['civil-engineering'], name: 'Installations électriques', level: 75, description: 'Électricité de base, installations domestiques' },
      { categoryId: categoryMap['civil-engineering'], name: 'Conception structurelle', level: 70, description: 'Calcul et dimensionnement des structures' },
      { categoryId: categoryMap['civil-engineering'], name: 'Béton armé', level: 75, description: 'Conception et calcul des éléments en béton armé' },
    ] : [],
    ...skillCategories.find(c => c.id ===2) ? [
      { categoryId: categoryMap['mathematics'], name: 'Analyse mathématique', level: 90, description: 'Calcul différentiel et intégral, équations différentielles' },
      { categoryId: categoryMap['mathematics'], name: 'Algèbre linéaire', level: 85, description: 'Espaces vectoriels, matrices, transformations linéaires' },
      { categoryId: categoryMap['mathematics'], name: 'Analyse numérique', level: 80, description: 'Méthodes numériques, approximations, résolution d\'équations' },
      { categoryId: categoryMap['mathematics'], name: 'Probabilités & Statistiques', level: 75, description: 'Modélisation stochastique, analyse de données' },
      { categoryId: categoryMap['mathematics'], name: 'Optimisation', level: 70, description: 'Recherche opérationnelle, programmation linéaire' },
    ] : [],
    ...skillCategories.find(c => c.id === 3) ? [
      { categoryId: categoryMap['technical'], name: 'Forage et puits', level: 80, description: 'Creusage et aménagement des forages et des puits' },
      { categoryId: categoryMap['technical'], name: 'Gestion d\'équipements', level: 75, description: 'Moulinex à écraser (maïs, arachides, tomates, mil, sorgho)' },
      { categoryId: categoryMap['technical'], name: 'Transport', level: 70, description: 'Conduite et gestion de moto-taxis' },
      { categoryId: categoryMap['technical'], name: 'AutoCAD', level: 65, description: 'Dessin technique et plans de construction' },
      { categoryId: categoryMap['technical'], name: 'Topographie', level: 70, description: 'Relevés topographiques, nivellement' },
    ] : [],
    ...skillCategories.find(c => c.id === 4) ? [
      { categoryId: categoryMap['soft-skills'], name: 'Enseignement', level: 85, description: 'Répétiteur en mathématiques (niveaux 1 et 2)' },
      { categoryId: categoryMap['soft-skills'], name: 'Travail en équipe', level: 80, description: 'Collaboration efficace dans les projets de groupe' },
      { categoryId: categoryMap['soft-skills'], name: 'Communication', level: 75, description: 'Expression claire en français, notions d\'anglais technique' },
      { categoryId: categoryMap['soft-skills'], name: 'Résolution de problèmes', level: 85, description: 'Approche analytique et créative' },
      { categoryId: categoryMap['soft-skills'], name: 'Adaptabilité', level: 80, description: 'Capacité d\'apprentissage et d\'adaptation rapide' },
    ] : [],
  ];
  await prisma.skill.createMany({ data: skillsData });

  // Insérer les certifications
  const certifications = [
    {
      name: 'Baccalauréat série C',
      institution: 'Lycée de Mimboman',
      year: '2020',
      location: 'Yaoundé, Cameroun',
      type: 'Diplôme national',
      description: 'Baccalauréat scientifique avec spécialisation en mathématiques et sciences physiques',
      icon: '', // Ignoré dans la base
      color: 'from-blue-500 to-indigo-600',
      verified: true,
    },
    {
      name: 'BEPC (Brevet d\'Études du Premier Cycle)',
      institution: 'Lycée d\'Elig Essono',
      year: '2017',
      location: 'Yaoundé, Cameroun',
      type: 'Diplôme national',
      description: 'Diplôme sanctionnant la fin du premier cycle de l\'enseignement secondaire',
      icon: '', // Ignoré dans la base
      color: 'from-green-500 to-emerald-600',
      verified: true,
    },
    {
      name: 'Probatoire série C',
      institution: 'Collège Saint André',
      year: '2019',
      location: 'Yaoundé, Cameroun',
      type: 'Diplôme national',
      description: 'Diplôme d\'accès en classe de terminale, série scientifique',
      icon: '', // Ignoré dans la base
      color: 'from-purple-500 to-violet-600',
      verified: true,
    },
    {
      name: 'Licence en Mathématiques fondamentales',
      institution: 'Université de Yaoundé I',
      year: '2023',
      location: 'Yaoundé, Cameroun',
      type: 'Diplôme universitaire',
      description: 'Formation approfondie en analyse mathématique, algèbre et géométrie',
      icon: '', // Ignoré dans la base
      color: 'from-cyan-500 to-blue-600',
      verified: true,
    },
    {
      name: 'Validation MSP 1 & MSP 2',
      institution: 'École Nationale Supérieure Polytechnique',
      year: '2024',
      location: 'Yaoundé, Cameroun',
      type: 'Formation d\'ingénieur',
      description: 'Formation en génie civil - Mathématiques Spéciales Préparatoires',
      icon: '', // Ignoré dans la base
      color: 'from-orange-500 to-red-600',
      verified: true,
    },
    {
      name: 'CEP (Certificat d\'Études Primaires)',
      institution: 'École publique d\'Essos',
      year: '2013',
      location: 'Yaoundé, Cameroun',
      type: 'Diplôme primaire',
      description: 'Certificat de fin d\'études primaires',
      icon: '', // Ignoré dans la base
      color: 'from-teal-500 to-cyan-600',
      verified: true,
    },
  ];
  await prisma.certification.createMany({ data: certifications });

  // Insérer les projets
  const projects = [
    {
      title: "Analyse structurelle d'un pont en béton armé",
      description: "Conception et calcul de résistance pour un pont de 30 mètres de portée, incluant l'analyse des charges permanentes et d'exploitation.",
      category: 'civil',
      technologies: ['AutoCAD', 'Calculs manuels', 'Béton armé', 'RDM'],
      status: 'completed',
      image: '/images/projects/pont.jpg',
      startDate: new Date('2023-09-01'),
      endDate: new Date('2023-12-31'),
      highlights: [
        'Dimensionnement des poutres principales',
        'Calcul des charges et surcharges',
        'Vérification de la stabilité',
        "Plans d'exécution détaillés"
      ],
      detailedDescription: "Ce projet académique consistait à concevoir et calculer un pont en béton armé pour franchir une rivière. Le travail comprenait l'étude géotechnique, le dimensionnement des fondations, le calcul des poutres et du tablier, ainsi que la vérification de tous les états limites selon les normes en vigueur.",
    },
    {
      title: "Résolution d'équations différentielles par méthodes numériques",
      description: "Développement d'algorithmes pour résoudre des systèmes d'équations différentielles appliqués à la modélisation de structures dynamiques.",
      category: 'math',
      technologies: ['Python', 'MATLAB', 'Analyse numérique', 'Scipy'],
      status: 'current',
      image: '/images/projects/equations.jpg',
      startDate: new Date('2024-01-01'),
      highlights: [
        'Méthodes de Runge-Kutta',
        'Approximations par différences finies',
        'Validation des résultats',
        'Interface graphique interactive'
      ],
      detailedDescription: "Projet de recherche sur l'application des méthodes numériques avancées pour résoudre des équations différentielles ordinaires et partielles. Focus sur les applications en génie civil, notamment la dynamique des structures et l'analyse vibratoire.",
    },
    {
      title: "Système de gestion des eaux pluviales urbaines",
      description: "Conception d'un système de drainage pour un quartier résidentiel, incluant dimensionnement des caniveaux et bassins de rétention.",
      category: 'civil',
      technologies: ['Hydraulique urbaine', 'Topographie', 'AutoCAD', 'Calculs hydrologiques'],
      status: 'completed',
      image: '/images/projects/drainage.jpg',
      startDate: new Date('2023-03-01'),
      endDate: new Date('2023-06-30'),
      highlights: [
        'Étude hydrologique du bassin versant',
        'Dimensionnement des ouvrages',
        'Calcul des débits de pointe',
        'Plans de réseaux'
      ],
      detailedDescription: "Étude complète d'aménagement urbain pour la gestion des eaux pluviales d'un quartier de 500 habitants. Analyse des précipitations, calcul des débits, dimensionnement des canalisations et conception de bassins de rétention.",
    },
    {
      title: "Optimisation topologique de structures",
      description: "Application d'algorithmes d'optimisation pour réduire le poids des structures tout en maintenant leur résistance mécanique.",
      category: 'math',
      technologies: ['Python', 'Optimisation', 'Éléments finis', 'Algorithmes génétiques'],
      status: 'current',
      image: '/images/projects/optimization.jpg',
      startDate: new Date('2024-02-01'),
      highlights: [
        "Algorithmes d'optimisation topologique",
        "Analyse par éléments finis",
        'Réduction de masse de 30%',
        'Validation expérimentale'
      ],
      detailedDescription: "Recherche sur l'optimisation de la forme et de la topologie des structures en béton armé et acier. Utilisation d'algorithmes bio-inspirés pour minimiser le poids tout en respectant les contraintes de résistance et de déformation.",
    },
    {
      title: "Installation électrique d'un bâtiment résidentiel",
      description: "Conception et réalisation complète de l'installation électrique d'une maison individuelle selon les normes camerounaises.",
      category: 'technical',
      technologies: ['Électricité bâtiment', 'Schémas électriques', 'Normes NF C 15-100', 'Câblage'],
      status: 'completed',
      image: '/images/projects/electrical.jpg',
      startDate: new Date('2023-07-01'),
      endDate: new Date('2023-08-31'),
      highlights: [
        'Schémas unifilaires et multifilaires',
        'Dimensionnement des protections',
        'Mise en œuvre pratique',
        'Respect des normes de sécurité'
      ],
      detailedDescription: "Projet pratique de conception et réalisation d'une installation électrique domestique. Travail complet depuis l'étude des besoins jusqu'à la mise en service, en passant par les calculs de dimensionnement et la réalisation des schémas.",
    },
    {
      title: "Forage et aménagement de puits",
      description: "Conception et supervision d'un projet de forage d'eau potable pour une communauté rurale, incluant l'étude hydrogéologique.",
      category: 'technical',
      technologies: ['Hydrogéologie', 'Techniques de forage', 'Pompage', 'Traitement d\'eau'],
      status: 'completed',
      image: '/images/projects/forage.jpg',
      startDate: new Date('2023-05-01'),
      endDate: new Date('2023-07-31'),
      highlights: [
        'Étude hydrogéologique préalable',
        'Supervision du forage',
        'Installation de la pompe',
        'Formation des utilisateurs'
      ],
      detailedDescription: "Projet communautaire de réalisation d'un forage d'eau potable pour un village de 200 habitants. Coordination avec les entreprises de forage, supervision technique, et mise en place d'un système de maintenance durable.",
    },
  ];
  await prisma.project.createMany({ data: projects });

  // Insérer les formations (éducation)
  const education = [
    ...[
       {
        period: '2025-2026',
        title: '4 ème année Génie Civil',
        institutions: [ 'École Nationale Supérieure Polytechnique de Yaoundé '],
        location: 'Yaoundé, Cameroun',
        status: 'En cours',
        type: 'higher',
        icon: '', // Ignoré dans la base
        description: 'Application pratique en génie civil.',
        highlights: ['Conception d\'ouvrages en béton armé', 'Modélisation mathématique des structures', 'Mécanique des sols et fondations'],
      },
      {
        period: '2024-2025',
        title: 'Master 2 en Mathématiques & 3ème année Génie Civil',
        institutions: ['Université de Yaoundé I (Master 2 Mathématiques option Analyse et Applications)', 'École Nationale Supérieure Polytechnique de Yaoundé (3ème année Génie Civil)'],
        location: 'Yaoundé, Cameroun',
        status: 'Terminé',
        type: 'higher',
        icon: '', // Ignoré dans la base
        description: 'Formation avancée combinant expertise mathématique théorique et application pratique en génie civil.',
        highlights: ['Analyse fonctionnelle et équations différentielles', 'Conception d\'ouvrages en béton armé', 'Modélisation mathématique des structures', 'Mécanique des sols et fondations'],
      },
      {
        period: '2023-2024',
        title: 'Master 1 en Mathématiques & MSP 2',
        institutions: ['Université de Yaoundé I (Master 1 Mathématiques option Analyse et Applications)', 'École Nationale Supérieure Polytechnique de Yaoundé (MSP 2)'],
        location: 'Yaoundé, Cameroun',
        status: 'Validé',
        type: 'higher',
        icon: '', // Ignoré dans la base
        description: 'Approfondissement des mathématiques appliquées et initiation aux projets d\'ingénierie.',
        highlights: ['Analyse numérique et optimisation', 'Résistance des matériaux', 'Calcul différentiel et intégral avancé', 'Introduction aux méthodes de construction'],
      },
      {
        period: '2022-2023',
        title: 'Licence 3 Mathématiques & MSP 1',
        institutions: ['Université de Yaoundé I (Licence 3 Mathématiques fondamentales)', 'École Nationale Supérieure Polytechnique de Yaoundé (MSP 1)'],
        location: 'Yaoundé, Cameroun',
        status: 'Validé',
        type: 'higher',
        icon: '', // Ignoré dans la base
        description: 'Consolidation des bases mathématiques et découverte du génie civil.',
        highlights: ['Algèbre linéaire et géométrie', 'Topographie et dessin technique', 'Probabilités et statistiques', 'Matériaux de construction'],
      },
      {
        period: '2021-2022',
        title: 'Licence 2 Mathématiques & Admissions concours',
        institutions: ['Université de Yaoundé I (Licence 2 Mathématiques)', 'École Nationale Supérieure des Travaux Publics (Niveau 1)', 'Admission École Nationale Supérieure Polytechnique'],
        location: 'Yaoundé, Cameroun',
        status: 'Validé',
        type: 'higher',
        icon: '', // Ignoré dans la base
        description: 'Année charnière avec admission dans les écoles d\'ingénierie prestigieuses.',
        highlights: ['Analyse mathématique approfondie', 'Réussite aux concours d\'entrée', 'Premiers cours en travaux publics', 'Développement de la rigueur scientifique'],
      },
      {
        period: '2020-2021',
        title: 'Licence 1 Mathématiques & Admission ENSTP',
        institutions: ['Université de Yaoundé I (Licence 1 Mathématiques)', 'École Nationale Supérieure des Travaux Publics (70e/300 admis)'],
        location: 'Yaoundé, Cameroun',
        status: 'Validé',
        type: 'higher',
        icon: '', // Ignoré dans la base
        description: 'Début des études supérieures avec un excellent classement au concours ENSTP.',
        highlights: ['Bases solides en mathématiques', 'Excellent classement au concours', 'Adaptation aux études supérieures', 'Découverte du monde de l\'ingénierie'],
      },
    ],
    ...[
      {
        period: '2019-2020',
        title: 'Baccalauréat série C',
        institutions: ['Lycée de Mimboman'],
        location: 'Yaoundé, Cameroun',
        status: 'Validé',
        type: 'secondary',
        icon: '', // Ignoré dans la base
        description: '',
        highlights: [],
      },
      {
        period: '2017-2019',
        title: 'Seconde C jusqu\'au Probatoire C',
        institutions: ['Collège Saint André'],
        location: 'Yaoundé, Cameroun',
        status: 'Validé',
        type: 'secondary',
        icon: '', // Ignoré dans la base
        description: '',
        highlights: [],
      },
      {
        period: '2016-2017',
        title: 'BEPC',
        institutions: ['Lycée d\'Elig Essono'],
        location: 'Yaoundé, Cameroun',
        status: 'Validé',
        type: 'secondary',
        icon: '', // Ignoré dans la base
        description: '',
        highlights: [],
      },
    ],
  ];
  await prisma.education.createMany({ data: education });

  console.log('Données de seed insérées avec succès !');
}

main()
  .catch((e) => {
    console.error('Erreur lors de l\'exécution du seed :', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('Déconnexion de Prisma terminée.');
  });