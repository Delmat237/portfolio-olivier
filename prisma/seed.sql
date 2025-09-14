--
-- Insertion des données initiales pour le projet Portfolio d'Olivier
--

-- Désactiver les contrôles de clés étrangères temporairement pour éviter les erreurs de dépendance
SET session_replication_role = 'replica';
-- Suppression des données existantes pour éviter les conflits
DELETE FROM "Skill";
DELETE FROM "SkillCategory";
DELETE FROM "Certification";
DELETE FROM "Project";
DELETE FROM "Education";
DELETE FROM "User";
DELETE FROM "ProjectCategory";
-- Réinitialisation des séquences d'ID pour chaque table
ALTER SEQUENCE "Skill_id_seq" RESTART WITH 1;
ALTER SEQUENCE "SkillCategory_id_seq" RESTART WITH 1;
ALTER SEQUENCE "Certification_id_seq" RESTART WITH 1;
ALTER SEQUENCE "Project_id_seq" RESTART WITH 1;
ALTER SEQUENCE "Education_id_seq" RESTART WITH 1;
ALTER SEQUENCE "User_id_seq" RESTART WITH 1;
-- Note: 'ProjectCategory' n'a pas de séquence car son ID est un String
---
-- Insertion des catégories de compétences (SkillCategory)
INSERT INTO "SkillCategory" (
        "title",
        "icon",
        "color",
        "bgColor",
        "createdAt",
        "updatedAt"
    )
VALUES (
        'Génie Civil',
        '',
        'from-civil-500 to-blue-600',
        'from-civil-50 to-blue-50',
        NOW(),
        NOW()
    ),
    (
        'Mathématiques',
        '',
        'from-math-500 to-purple-600',
        'from-math-50 to-purple-50',
        NOW(),
        NOW()
    ),
    (
        'Compétences techniques',
        '',
        'from-orange-500 to-red-600',
        'from-orange-50 to-red-50',
        NOW(),
        NOW()
    ),
    (
        'Compétences transversales',
        '',
        'from-green-500 to-teal-600',
        'from-green-50 to-teal-50',
        NOW(),
        NOW()
    );
---
-- Insertion des compétences (Skill)
-- Les categoryId sont basés sur l'ordre d'insertion des catégories ci-dessus (1, 2, 3, 4)
INSERT INTO "Skill" (
        "categoryId",
        "name",
        "level",
        "description",
        "createdAt",
        "updatedAt"
    )
VALUES (
        1,
        'Maçonnerie',
        85,
        'Construction et rénovation, techniques traditionnelles et modernes',
        NOW(),
        NOW()
    ),
    (
        1,
        'Plomberie',
        80,
        'Installation et maintenance des systèmes hydrauliques',
        NOW(),
        NOW()
    ),
    (
        1,
        'Installations électriques',
        75,
        'Électricité de base, installations domestiques',
        NOW(),
        NOW()
    ),
    (
        1,
        'Conception structurelle',
        70,
        'Calcul et dimensionnement des structures',
        NOW(),
        NOW()
    ),
    (
        1,
        'Béton armé',
        75,
        'Conception et calcul des éléments en béton armé',
        NOW(),
        NOW()
    ),
    (
        2,
        'Analyse mathématique',
        90,
        'Calcul différentiel et intégral, équations différentielles',
        NOW(),
        NOW()
    ),
    (
        2,
        'Algèbre linéaire',
        85,
        'Espaces vectoriels, matrices, transformations linéaires',
        NOW(),
        NOW()
    ),
    (
        2,
        'Analyse numérique',
        80,
        'Méthodes numériques, approximations, résolution d''équations',
        NOW(),
        NOW()
    ),
    (
        2,
        'Probabilités & Statistiques',
        75,
        'Modélisation stochastique, analyse de données',
        NOW(),
        NOW()
    ),
    (
        2,
        'Optimisation',
        70,
        'Recherche opérationnelle, programmation linéaire',
        NOW(),
        NOW()
    ),
    (
        3,
        'Forage et puits',
        80,
        'Creusage et aménagement des forages et des puits',
        NOW(),
        NOW()
    ),
    (
        3,
        'Gestion d''équipements',
        75,
        'Moulinex à écraser (maïs, arachides, tomates, mil, sorgho)',
        NOW(),
        NOW()
    ),
    (
        3,
        'Transport',
        70,
        'Conduite et gestion de moto-taxis',
        NOW(),
        NOW()
    ),
    (
        3,
        'AutoCAD',
        65,
        'Dessin technique et plans de construction',
        NOW(),
        NOW()
    ),
    (
        3,
        'Topographie',
        70,
        'Relevés topographiques, nivellement',
        NOW(),
        NOW()
    ),
    (
        4,
        'Enseignement',
        85,
        'Répétiteur en mathématiques (niveaux 1 et 2)',
        NOW(),
        NOW()
    ),
    (
        4,
        'Travail en équipe',
        80,
        'Collaboration efficace dans les projets de groupe',
        NOW(),
        NOW()
    ),
    (
        4,
        'Communication',
        75,
        'Expression claire en français, notions d''anglais technique',
        NOW(),
        NOW()
    ),
    (
        4,
        'Résolution de problèmes',
        85,
        'Approche analytique et créative',
        NOW(),
        NOW()
    ),
    (
        4,
        'Adaptabilité',
        80,
        'Capacité d''apprentissage et d''adaptation rapide',
        NOW(),
        NOW()
    );
---
-- Insertion des certifications (Certification)
INSERT INTO "Certification" (
        "name",
        "institution",
        "year",
        "location",
        "type",
        "description",
        "icon",
        "color",
        "verified",
        "createdAt",
        "updatedAt"
    )
VALUES (
        'Baccalauréat série C',
        'Lycée de Mimboman',
        '2020',
        'Yaoundé, Cameroun',
        'Diplôme national',
        'Baccalauréat scientifique avec spécialisation en mathématiques et sciences physiques',
        '',
        'from-blue-500 to-indigo-600',
        TRUE,
        NOW(),
        NOW()
    ),
    (
        'BEPC (Brevet d''Études du Premier Cycle)',
        'Lycée d''Elig Essono',
        '2017',
        'Yaoundé, Cameroun',
        'Diplôme national',
        'Diplôme sanctionnant la fin du premier cycle de l''enseignement secondaire',
        '',
        'from-green-500 to-emerald-600',
        TRUE,
        NOW(),
        NOW()
    ),
    (
        'Probatoire série C',
        'Collège Saint André',
        '2019',
        'Yaoundé, Cameroun',
        'Diplôme national',
        'Diplôme d''accès en classe de terminale, série scientifique',
        '',
        'from-purple-500 to-violet-600',
        TRUE,
        NOW(),
        NOW()
    ),
    (
        'Licence en Mathématiques fondamentales',
        'Université de Yaoundé I',
        '2023',
        'Yaoundé, Cameroun',
        'Diplôme universitaire',
        'Formation approfondie en analyse mathématique, algèbre et géométrie',
        '',
        'from-cyan-500 to-blue-600',
        TRUE,
        NOW(),
        NOW()
    ),
    (
        'Validation MSP 1 & MSP 2',
        'École Nationale Supérieure Polytechnique',
        '2024',
        'Yaoundé, Cameroun',
        'Formation d''ingénieur',
        'Formation en génie civil - Mathématiques Spéciales Préparatoires',
        '',
        'from-orange-500 to-red-600',
        TRUE,
        NOW(),
        NOW()
    ),
    (
        'CEP (Certificat d''Études Primaires)',
        'École publique d''Essos',
        '2013',
        'Yaoundé, Cameroun',
        'Diplôme primaire',
        'Certificat de fin d''études primaires',
        '',
        'from-teal-500 to-cyan-600',
        TRUE,
        NOW(),
        NOW()
    );
---
-- Insertion des projets (Project)
-- INSERT INTO "Project" (
--         "title",
--         "description",
--         "category",
--         "technologies",
--         "status",
--         "image",
--         "link",
--         "startDate",
--         "endDate",
--         "highlights",
--         "detailedDescription",
--         "createdAt",
--         "updatedAt"
--     )
-- VALUES (
--         'Analyse structurelle d''un pont en béton armé',
--         'Conception et calcul de résistance pour un pont de 30 mètres de portée, incluant l''analyse des charges permanentes et d''exploitation.',
--         'civil',
--         '{AutoCAD, Calculs manuels, Béton armé, RDM}',
--         'completed',
--         '/images/projects/pont.jpg',
--         NULL,
--         '2023-09-01T00:00:00Z',
--         '2023-12-31T00:00:00Z',
--         '{"Dimensionnement des poutres principales", "Calcul des charges et surcharges", "Vérification de la stabilité", "Plans d''exécution détaillés"}',
--         'Ce projet académique consistait à concevoir et calculer un pont en béton armé pour franchir une rivière. Le travail comprenait l''étude géotechnique, le dimensionnement des fondations, le calcul des poutres et du tablier, ainsi que la vérification de tous les états limites selon les normes en vigueur.',
--         NOW(),
--         NOW()
--     ),
--     (
--         'Résolution d''équations différentielles par méthodes numériques',
--         'Développement d''algorithmes pour résoudre des systèmes d''équations différentielles appliqués à la modélisation de structures dynamiques.',
--         'math',
--         '{Python, MATLAB, Analyse numérique, Scipy}',
--         'current',
--         '/images/projects/equations.jpg',
--         NULL,
--         '2024-01-01T00:00:00Z',
--         NULL,
--         '{"Méthodes de Runge-Kutta", "Approximations par différences finies", "Validation des résultats", "Interface graphique interactive"}',
--         'Projet de recherche sur l''application des méthodes numériques avancées pour résoudre des équations différentielles ordinaires et partielles. Focus sur les applications en génie civil, notamment la dynamique des structures et l''analyse vibratoire.',
--         NOW(),
--         NOW()
--     ),
--     (
--         'Système de gestion des eaux pluviales urbaines',
--         'Conception d''un système de drainage pour un quartier résidentiel, incluant dimensionnement des caniveaux et bassins de rétention.',
--         'civil',
--         '{Hydraulique urbaine, Topographie, AutoCAD, Calculs hydrologiques}',
--         'completed',
--         '/images/projects/drainage.jpg',
--         NULL,
--         '2023-03-01T00:00:00Z',
--         '2023-06-30T00:00:00Z',
--         '{"Étude hydrologique du bassin versant", "Dimensionnement des ouvrages", "Calcul des débits de pointe", "Plans de réseaux"}',
--         'Étude complète d''aménagement urbain pour la gestion des eaux pluviales d''un quartier de 500 habitants. Analyse des précipitations, calcul des débits, dimensionnement des canalisations et conception de bassins de rétention.',
--         NOW(),
--         NOW()
--     ),
--     (
--         'Optimisation topologique de structures',
--         'Application d''algorithmes d''optimisation pour réduire le poids des structures tout en maintenant leur résistance mécanique.',
--         'math',
--         '{Python, Optimisation, Éléments finis, Algorithmes génétiques}',
--         'current',
--         '/images/projects/optimization.jpg',
--         NULL,
--         '2024-02-01T00:00:00Z',
--         NULL,
--         '{"Algorithmes d''optimisation topologique", "Analyse par éléments finis", "Réduction de masse de 30%", "Validation expérimentale"}',
--         'Recherche sur l''optimisation de la forme et de la topologie des structures en béton armé et acier. Utilisation d''algorithmes bio-inspirés pour minimiser le poids tout en respectant les contraintes de résistance et de déformation.',
--         NOW(),
--         NOW()
--     ),
--     (
--         'Installation électrique d''un bâtiment résidentiel',
--         'Conception et réalisation complète de l''installation électrique d''une maison individuelle selon les normes camerounaises.',
--         'technical',
--         '{Électricité bâtiment, Schémas électriques, Normes NF C 15-100, Câblage}',
--         'completed',
--         '/images/projects/electrical.jpg',
--         NULL,
--         '2023-07-01T00:00:00Z',
--         '2023-08-31T00:00:00Z',
--         '{"Schémas unifilaires et multifilaires", "Dimensionnement des protections", "Mise en œuvre pratique", "Respect des normes de sécurité"}',
--         'Projet pratique de conception et réalisation d''une installation électrique domestique. Travail complet depuis l''étude des besoins jusqu''à la mise en service, en passant par les calculs de dimensionnement et la réalisation des schémas.',
--         NOW(),
--         NOW()
--     ),
--     (
--         'Forage et aménagement de puits',
--         'Conception et supervision d''un projet de forage d''eau potable pour une communauté rurale, incluant l''étude hydrogéologique.',
--         'technical',
--         '{Hydrogéologie, Techniques de forage, Pompage, Traitement d''eau}',
--         'completed',
--         '/images/projects/forage.jpg',
--         NULL,
--         '2023-05-01T00:00:00Z',
--         '2023-07-31T00:00:00Z',
--         '{"Étude hydrogéologique préalable", "Supervision du forage", "Installation de la pompe", "Formation des utilisateurs"}',
--         'Projet communautaire de réalisation d''un forage d''eau potable pour un village de 200 habitants. Coordination avec les entreprises de forage, supervision technique, et mise en place d''un système de maintenance durable.',
--         NOW(),
--         NOW()
--     );
---
-- Insertion des formations (Education)
INSERT INTO "Education" (
        "period",
        "title",
        "institutions",
        "location",
        "status",
        "type",
        "icon",
        "description",
        "highlights",
        "createdAt",
        "updatedAt"
    )
VALUES (
        '2025-2026',
        '4 ème année Génie Civil',
        '{"École Nationale Supérieure Polytechnique de Yaoundé "}',
        'Yaoundé, Cameroun',
        'En cours',
        'higher',
        '',
        'Application pratique en génie civil.',
        '{"Conception d''ouvrages en béton armé", "Modélisation mathématique des structures", "Mécanique des sols et fondations"}',
        NOW(),
        NOW()
    ),
    (
        '2024-2025',
        'Master 2 en Mathématiques & 3ème année Génie Civil',
        '{"Université de Yaoundé I (Master 2 Mathématiques option Analyse et Applications)", "École Nationale Supérieure Polytechnique de Yaoundé (3ème année Génie Civil)"}',
        'Yaoundé, Cameroun',
        'Terminé',
        'higher',
        '',
        'Formation avancée combinant expertise mathématique théorique et application pratique en génie civil.',
        '{"Analyse fonctionnelle et équations différentielles", "Conception d''ouvrages en béton armé", "Modélisation mathématique des structures", "Mécanique des sols et fondations"}',
        NOW(),
        NOW()
    ),
    (
        '2023-2024',
        'Master 1 en Mathématiques & MSP 2',
        '{"Université de Yaoundé I (Master 1 Mathématiques option Analyse et Applications)", "École Nationale Supérieure Polytechnique de Yaoundé (MSP 2)"}',
        'Yaoundé, Cameroun',
        'Validé',
        'higher',
        '',
        'Approfondissement des mathématiques appliquées et initiation aux projets d''ingénierie.',
        '{"Analyse numérique et optimisation", "Résistance des matériaux", "Calcul différentiel et intégral avancé", "Introduction aux méthodes de construction"}',
        NOW(),
        NOW()
    ),
    (
        '2022-2023',
        'Licence 3 Mathématiques & MSP 1',
        '{"Université de Yaoundé I (Licence 3 Mathématiques fondamentales)", "École Nationale Supérieure Polytechnique de Yaoundé (MSP 1)"}',
        'Yaoundé, Cameroun',
        'Validé',
        'higher',
        '',
        'Consolidation des bases mathématiques et découverte du génie civil.',
        '{"Algèbre linéaire et géométrie", "Topographie et dessin technique", "Probabilités et statistiques", "Matériaux de construction"}',
        NOW(),
        NOW()
    ),
    (
        '2021-2022',
        'Licence 2 Mathématiques & Admissions concours',
        '{"Université de Yaoundé I (Licence 2 Mathématiques)", "École Nationale Supérieure des Travaux Publics (Niveau 1)", "Admission École Nationale Supérieure Polytechnique"}',
        'Yaoundé, Cameroun',
        'Validé',
        'higher',
        '',
        'Année charnière avec admission dans les écoles d''ingénierie prestigieuses.',
        '{"Analyse mathématique approfondie", "Réussite aux concours d''entrée", "Premiers cours en travaux publics", "Développement de la rigueur scientifique"}',
        NOW(),
        NOW()
    ),
    (
        '2020-2021',
        'Licence 1 Mathématiques & Admission ENSTP',
        '{"Université de Yaoundé I (Licence 1 Mathématiques)", "École Nationale Supérieure des Travaux Publics (70e/300 admis)"}',
        'Yaoundé, Cameroun',
        'Validé',
        'higher',
        '',
        'Début des études supérieures avec un excellent classement au concours ENSTP.',
        '{"Bases solides en mathématiques", "Excellent classement au concours", "Adaptation aux études supérieures", "Découverte du monde de l''ingénierie"}',
        NOW(),
        NOW()
    ),
    (
        '2019-2020',
        'Baccalauréat série C',
        '{"Lycée de Mimboman"}',
        'Yaoundé, Cameroun',
        'Validé',
        'secondary',
        '',
        '',
        '{}',
        NOW(),
        NOW()
    ),
    (
        '2017-2019',
        'Seconde C jusqu''au Probatoire C',
        '{"Collège Saint André"}',
        'Yaoundé, Cameroun',
        'Validé',
        'secondary',
        '',
        '',
        '{}',
        NOW(),
        NOW()
    ),
    (
        '2016-2017',
        'BEPC',
        '{"Lycée d''Elig Essono"}',
        'Yaoundé, Cameroun',
        'Validé',
        'secondary',
        '',
        '',
        '{}',
        NOW(),
        NOW()
    );
---
-- Insertion d'un utilisateur de test (User)
-- Le mot de passe hashé est un exemple, remplacez-le par le vôtre
INSERT INTO "User" (
        "email",
        "password",
        "name",
        "createdAt",
        "updatedAt"
    )
VALUES (
        'admin@gmail.com',
        '$2b$10$KBEpwx4JdQQu76xPSFW2lO/1eADQaFzB/tK6QplbryHbgol0fnadC',
        'Admin',
        NOW(),
        NOW()
    );
---
-- Insertion des catégories de projets (ProjectCategory)
-- Note: L'ID est un String ici, pas un nombre auto-incrémenté
INSERT INTO "ProjectCategory" ("id", "name", "icon")
VALUES ('civil', 'Génie Civil', 'Building'),
    ('math', 'Mathématiques', 'Calculator'),
    ('technical', 'Compétences Techniques', 'Tools');
-- Réactiver les contrôles de clés étrangères
SET session_replication_role = 'origin';