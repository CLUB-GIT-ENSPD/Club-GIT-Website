import { Track, BureauMember, Project, ServiceItem, GalleryItem } from '../types';

export const CLUB_META = {
  name: "Club GIT · ENSPD",
  fullName: "Club Génie Informatique & Télécommunications",
  institution: "École Nationale Supérieure Polytechnique de Douala (ENSPD)",
  university: "Université de Douala, Cameroun",
  motto: "L'excellence par le code, l'infrastructure et l'innovation collaborative.",
  campus: "Campus de Ndogbong / PK17, Douala",
  email: "contact@clubgit-enspd.cm",
  socials: {
    github: "https://github.com/CLUB-GIT-ENSPD",
    linkedin: "https://linkedin.com/company/club-git-enspd",
    whatsapp: "https://whatsapp.com/channel/0029VaClubGITENSPD",
    instagram: "https://instagram.com/clubgit_enspd",
    facebook: "https://facebook.com/clubgitenspd",
    googleDrive: "https://drive.google.com/drive/folders/club-git-enspd",
    googlePhotos: "https://photos.app.goo.gl/club-git-enspd"
  },
  stats: [
    { value: "+280", label: "Membres Actifs", detail: "Étudiants ingénieurs du cycle polytechnicien" },
    { value: "2", label: "Filières d'Ingénierie", detail: "Génie Logiciel (GLO) & Réseaux Télécoms (GRT)" },
    { value: "18+", label: "Projets & Hackathons", detail: "Solutions concrètes développées pour le campus" },
    { value: "100%", label: "Soutenances Accompagnées", detail: "Taux de réussite aux jurys de diplôme d'ingénieur" }
  ]
};

export const TRACKS_DATA: Track[] = [
  {
    id: "glo",
    shortCode: "GLO",
    name: "Génie Logiciel",
    description: "Conception, développement et déploiement d'applications distribuées, web et mobiles de haute volée. Maîtrise des architectures microservices, des bases de données massives et des pipelines DevOps.",
    iconName: "code",
    imageUrl: "/images/photo1.jpg",
    technologies: ["React / TypeScript", "Node.js / Python", "Docker / Kubernetes", "PostgreSQL / Redis", "GitLab CI/CD", "Next.js"],
    careers: ["Architecte Logiciel", "Ingénieur Full-Stack", "Ingénieur DevOps", "Lead Développeur", "Consultant Cloud"],
    featuredTopics: ["Microservices & Clean Architecture", "Bases de données relationnelles & NoSQL", "Tests automatisés & CI/CD", "Applications Web & Mobile Haute Performance"],
    diploma: "Diplôme d'Ingénieur de Conception (Bac +5)"
  },
  {
    id: "grt",
    shortCode: "GRT",
    name: "Génie Réseau & Télécommunications",
    description: "Ingénierie des infrastructures d'interconnexion, transmission haut débit et télécommunications numériques. Déploiement de réseaux opérateurs (4G/5G, Fibre Optique), routage avancé et administration systèmes.",
    iconName: "network",
    imageUrl: "/images/photo3.jpg",
    technologies: ["Cisco IOS", "MikroTik RouterOS", "Fibre Optique & FTTH", "Wireshark", "Linux Administration", "VoIP / Asterisk", "BGP / OSPF"],
    careers: ["Ingénieur Réseaux & Télécoms", "Administrateur Systèmes & Infrastructure", "Ingénieur Transmission & Déploiement", "Architecte Réseau Cloud"],
    featuredTopics: ["Routage IP dynamique & SDN", "Réseaux d'opérateurs mobiles 4G/5G", "Infrastructures Datacenter & Virtualisation", "Téléphonie IP et communication unifiée"],
    diploma: "Diplôme d'Ingénieur de Conception (Bac +5)"
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "polytech-portal",
    title: "PolyTech Hub · Portail Estudiantin ENSPD",
    summary: "Plateforme web unifiée permettant la consultation des plannings de cours, le partage de ressources académiques et la réservation des laboratoires informatiques.",
    description: "Conçu et maintenu par les étudiants du Club GIT pour simplifier la vie de campus à l'ENSPD. PolyTech Hub centralise les annonces de la scolarité, les supports de cours validés par les délégués et l'accès aux fiches de révision.",
    category: "logiciel",
    status: "completed",
    leadName: "Jean-Paul Manga",
    leadRole: "Responsable Pôle Projets (GLO)",
    teamCount: 6,
    progress: 100,
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
    demoUrl: "https://polytech-hub.enspd.cm",
    repoUrl: "https://github.com/CLUB-GIT-ENSPD/polytech-hub",
    imageUrl: "/images/photo1.jpg",
    milestones: [
      { title: "Cahier des charges & Ateliers UI/UX", status: "completed", description: "Enquêtes auprès des 500 étudiants de l'école et maquettage interactif." },
      { title: "Développement du Backend & API REST", status: "completed", description: "Architecture sécurisée avec authentification JWT et base relationnelle." },
      { title: "Intégration Frontend & Responsive Design", status: "completed", description: "Interface optimisée mobile pour les connexions à bande passante réduite." },
      { title: "Mise en production & Formation des délégués", status: "completed", description: "Hébergement sur serveur dédié campus et maintenance continue." }
    ],
    outcomes: [
      "+1 400 étudiants actifs chaque semestre",
      "99.8% de disponibilité lors des périodes d'examens",
      "Réduction de 70% des confusions d'horaires et de salles"
    ]
  },
  {
    id: "campusnet-monitor",
    title: "CampusNet Sentinel · Surveillance Réseau PK17",
    summary: "Outil de télémétrie et monitoring passif pour optimiser la bande passante Wi-Fi et détecter les goulets d'étranglement sur le campus.",
    description: "Projet mené par l'équipe Réseau & Télécoms pour cartographier en temps réel la qualité de transmission, la latence vers les passerelles universitaires et la charge des points d'accès Ubiquiti et MikroTik installés dans les blocs pédagogiques.",
    category: "reseau",
    status: "active",
    leadName: "Christelle Ngo B.",
    leadRole: "Vice-Présidente & Lead Infrastructure (GRT)",
    teamCount: 4,
    progress: 85,
    tags: ["SNMP", "Python", "Prometheus", "Grafana", "MikroTik"],
    demoUrl: "https://sentinel.clubgit-enspd.cm",
    repoUrl: "https://github.com/CLUB-GIT-ENSPD/campusnet-sentinel",
    imageUrl: "/images/photo3.jpg",
    milestones: [
      { title: "Cartographie de l'infrastructure physique", status: "completed", description: "Recensement des switchs, fibres et bornes Wi-Fi du campus." },
      { title: "Déploiement des sondes Prometheus & SNMP", status: "completed", description: "Collecte des métriques de trafic, paquets perdus et latence." },
      { title: "Tableaux de bord d'alerting Grafana", status: "in_progress", description: "Génération automatique d'alertes Telegram en cas de panne de lien." },
      { title: "Intégration d'un module d'optimisation QoS", status: "planned", description: "Priorisation dynamique des flux académiques et soutenances." }
    ],
    outcomes: [
      "Détection des pannes de fibre en moins de 3 minutes",
      "Visibilité totale sur les 12 zones de couverture du campus",
      "Support opérationnel fourni au service informatique central"
    ]
  },
  {
    id: "opencode-enspd",
    title: "OpenCode ENSPD · Plateforme d'Algorithmique",
    summary: "Système d'évaluation automatique de code (Online Judge) pour l'entraînement aux algorithmes et aux structures de données.",
    description: "Développé pour les étudiants des cycles préparatoire et ingénieur, OpenCode permet de tester la complexité temporelle et spatiale des algorithmes soumis en C, C++, Python et Java avec des jeux de tests automatisés.",
    category: "logiciel",
    status: "active",
    leadName: "Boris Fotso",
    leadRole: "Lead Algorithmique & Dév (GLO)",
    teamCount: 4,
    progress: 80,
    tags: ["Go", "React", "Docker", "PostgreSQL", "Linux Sandbox"],
    demoUrl: "https://opencode.clubgit-enspd.cm",
    repoUrl: "https://github.com/CLUB-GIT-ENSPD/opencode",
    imageUrl: "/images/photo4.jpg",
    milestones: [
      { title: "Architecture du runner sécurisé en sandbox", status: "completed", description: "Exécution isolée des codes étudiants avec quotas stricts de CPU et mémoire." },
      { title: "Banque d'exercices de travaux dirigés", status: "completed", description: "Intégration de 80 problèmes avec tests unitaires et validation." },
      { title: "Organisation des sessions de concours live", status: "in_progress", description: "Classement en temps réel pour les marathons d'algorithmique." }
    ],
    outcomes: [
      "+350 soumissions de code validées par semaine",
      "Augmentation notable des moyennes en algorithmique au premier cycle"
    ]
  },
  {
    id: "hardware-clinic-portal",
    title: "KamerClinic · Plateforme Clinique PC & Télécoms",
    summary: "Application de ticketing et suivi des interventions de maintenance matérielle et réseau offertes aux étudiants.",
    description: "Permet aux étudiants de réserver un créneau de maintenance pour leur ordinateur portable, de suivre en direct l'état du diagnostic (dépoussiérage, remplacement de pâte thermique, réinstallation OS) et d'évaluer la prestation.",
    category: "reseau",
    status: "completed",
    leadName: "Arnaud Fomekong",
    leadRole: "Responsable Pôle Maintenance (GRT)",
    teamCount: 3,
    progress: 100,
    tags: ["Vue.js", "Express", "SQLite", "Tailwind CSS"],
    demoUrl: "https://clinic.clubgit-enspd.cm",
    repoUrl: "https://github.com/CLUB-GIT-ENSPD/kamerclinic",
    imageUrl: "/images/maintenance.jpg",
    milestones: [
      { title: "Définition du protocole de maintenance", status: "completed", description: "Checklist de diagnostic hardware et sauvegarde des données." },
      { title: "Développement de la plateforme de prise de RDV", status: "completed", description: "Système de ticket avec notifications par SMS / WhatsApp." },
      { title: "Bilan opérationnel semestriel", status: "completed", description: "Plus de 200 ordinateurs portables remis en parfait état de marche." }
    ],
    outcomes: [
      "+240 PC portables pris en charge avec succès depuis le lancement",
      "Dépannage rapide et tarifs étudiants transparents",
      "Formation pratique aux pannes hardware pour 15 techniciens juniors"
    ]
  }
];

export const BUREAU_MEMBERS: BureauMember[] = [
  {
    id: "b25-pres",
    name: "Ngooh Agnes Serena",
    role: "Présidente du club",
    department: "Génie Logiciel (GLO)",
    mandate: "2025-2026",
    category: "direction",
    bio: "Pilote la vision stratégique du Club GIT, assure la coordination générale et représente le club auprès de la Direction de l'ENSPD et des partenaires.",
    avatarUrl: "/images/ngooh-agnes-serena.jpeg"
  },
  {
    id: "b25-sg",
    name: "Nzeutem Eunice",
    role: "Secrétaire générale",
    department: "Génie Logiciel (GLO)",
    mandate: "2025-2026",
    category: "direction",
    bio: "Gère les archives officielles, rédige les procès-verbaux des assemblées, coordonne les courriers officiels et la tenue du registre des membres.",
    avatarUrl: "/images/nzeutem-eunice.jpeg"
  },
  {
    id: "b25-com-adj",
    name: "Ombessa Gododo Wilfred",
    role: "Responsable Adjoint Communication",
    department: "Génie Civil (GCI)",
    mandate: "2025-2026",
    category: "logistique",
    bio: "Assure la couverture photo/vidéo des ateliers, la rédaction des newsletters et l'animation de la communauté étudiante.",
    avatarUrl: "/images/ombessa-gododo-wilfred.jpeg"
  },
  {
    id: "b25-acad-charge",
    name: "Yonga Tiani Aristide Florent",
    role: "Chargé des Affaires Académiques",
    department: "Génie Réseau & Télécommunications (GRT)",
    mandate: "2025-2026",
    category: "academique",
    bio: "Supervise les séances de soutien académique, le parrainage des promotions et l'organisation des simulations de soutenances d'ingénieur.",
    avatarUrl: "/images/yonga-tiani-aristide-florent.jpeg"
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "support-academique",
    title: "Accompagnement Académique & Soutenances",
    category: "academique",
    summary: "Relecture experte de mémoires, coaching pour l'épreuve orale devant jury et préparation des supports de présentation.",
    description: "Le Club GIT mobilise des aînés académiques (élèves-ingénieurs de 5ème année et diplômés) pour accompagner les candidats aux soutenances de stage ouvrier, technique et de fin d'études. Nous auditons vos diaporamas, vos démonstrations logicielles et votre posture technique.",
    icon: "GraduationCap",
    deliverables: [
      "Relecture technique du mémoire & corrections de forme",
      "Simulation chronométrée de soutenance avec questions-pièges du jury",
      "Template Beamer LaTeX & PowerPoint professionnel aux normes ENSPD",
      "Audit de conformité du code source et de l'architecture"
    ],
    targetAudience: "Étudiants des Niveaux 3, 4 et 5 (GLO, GRT)",
    averageTime: "Intervention sous 48h à 72h avant soutenance"
  },
  {
    id: "maintenance-clinique",
    title: "Clinique de Maintenance & Dépannage PC",
    category: "maintenance",
    summary: "Dépoussiérage, remplacement de pâte thermique, réinstallation OS sécurisée et diagnostics pannes matérielles.",
    description: "Un ordinateur en panne est un frein majeur pour un futur ingénieur. La maintenance des PC s'effectue moyennant des frais raisonnables qui vous seront communiqués par le prestataire après soumission de votre formulaire de demande.",
    icon: "Wrench",
    deliverables: [
      "Diagnostic matériel approfondi (RAM, SSD, carte mère, écran)",
      "Nettoyage thermique & changement de pâte thermique haute performance",
      "Installation double boot (Linux Ubuntu/Debian + Windows 11 propre)",
      "Optimisation des performances et élimination des malwares/adwares"
    ],
    targetAudience: "Tous les étudiants et enseignants de l'ENSPD",
    averageTime: "Diagnostic en 2h · Réparation sous 24h"
  },
  {
    id: "bootcamps-formations",
    title: "Ateliers Pratiques & Bootcamps Accélérés",
    category: "formation",
    summary: "Sessions immersives chaque samedi matin pour acquérir les compétences recherchées par l'industrie numérique.",
    description: "Des formations dispensées par des pairs et des professionnels invités : Git & collaboration GitHub, conteneurisation Docker, administration réseaux Cisco, React et Python pour l'ingénierie.",
    icon: "Terminal",
    deliverables: [
      "Support de cours interactif & dépôts d'exemples pas-à-pas",
      "Projet guidé 'fil rouge' à réaliser et à ajouter à votre portfolio",
      "Badge numérique certifiant les compétences acquises",
      "Accès au canal d'entraide technique dédié sur Discord/WhatsApp"
    ],
    targetAudience: "Ouvert aux débutants comme aux profils avancés",
    averageTime: "Chaque samedi de 09h00 à 13h00"
  },
  {
    id: "solutions-developpement",
    title: "Pôle Ingénierie & Solutions Logicielles",
    category: "developpement",
    summary: "Conception sur-mesure d'applications web, mobiles et de plateformes de gestion pour la communauté universitaire.",
    description: "Le Club GIT met son vivier de talents au service des départements de l'ENSPD, des associations étudiantes et des initiatives partenaires pour modéliser, développer et déployer des solutions numériques d'impact.",
    icon: "Layers",
    deliverables: [
      "Cahier des charges fonctionnel et maquettage Figma",
      "Développement full-stack sécurisé selon les normes actuelles",
      "Déploiement sur infrastructure cloud ou serveurs locaux",
      "Documentation technique et formation des administrateurs"
    ],
    targetAudience: "Administration ENSPD, BDE, Départements et Clubs",
    averageTime: "Selon l'envergure du projet"
  }
];

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Cérémonie de Parrainage & Remise des Diplômes",
    category: "ceremonies",
    date: "Session Solennelle 2025",
    imageUrl: "/images/graduation.jpg",
    description: "Félicitations aux nouveaux ingénieurs de conception en Informatique et Télécommunications formés à l'ENSPD.",
    tags: ["Promotion", "Diplôme d'Ingénieur", "Excellence"]
  },
  {
    id: "gal-2",
    title: "Clinique Matérielle & Atelier de Maintenance PC",
    category: "maintenance",
    date: "Novembre 2025",
    imageUrl: "/images/maintenance.jpg",
    description: "Session intensive de dépoussiérage, remplacement de composants et optimisation thermique pour les machines des étudiants.",
    tags: ["Hardware", "Clinique IT", "Solidarité"]
  },
  {
    id: "gal-3",
    title: "Hackathon de Développement & Code Sprint",
    category: "hackathons",
    date: "Janvier 2026",
    imageUrl: "/images/photo1.jpg",
    description: "48 heures non-stop de programmation collaborative pour concevoir des prototypes répondant aux besoins de Douala.",
    tags: ["Hackathon", "Coding Sprint", "FullStack"]
  },
  {
    id: "gal-4",
    title: "Atelier Développement Applicatif & Microservices",
    category: "workshops",
    date: "Février 2026",
    imageUrl: "/images/photo2.jpg",
    description: "Immersion dans les architectures modernes d'APIs REST, Docker et bases de données relationnelles.",
    tags: ["Génie Logiciel", "GLO", "Docker"]
  },
  {
    id: "gal-5",
    title: "Séance d'Infrastructure & Laboratoire Télécoms",
    category: "workshops",
    date: "Mars 2026",
    imageUrl: "/images/photo3.jpg",
    description: "Câblage structuré, configuration de routeurs et simulation de réseaux d'opérateurs sur bancs de test.",
    tags: ["Réseaux", "Télécoms", "Cisco", "Fibre"]
  },
  {
    id: "gal-6",
    title: "Table Ronde & Mentorat avec les Alumni du Club",
    category: "ceremonies",
    date: "Décembre 2025",
    imageUrl: "/images/photo4.jpg",
    description: "Partage d'expériences avec des anciens du Club GIT désormais ingénieurs dans de grands groupes et startups internationales.",
    tags: ["Alumni", "Insertion Pro", "Réseautage"]
  },
  {
    id: "gal-7",
    title: "Photo de Famille · Assemblée Générale du Club",
    category: "ceremonies",
    date: "Rentrée 2025-2026",
    imageUrl: "/images/image_d_ensemble.jpg",
    description: "Mobilisation de l'ensemble des membres actifs, formateurs et membres du bureau pour le lancement de l'année académique.",
    tags: ["Communauté", "Bureau Exécutif", "ENSPD"]
  },
  {
    id: "gal-8",
    title: "Séance d'Atelier Pratique en Laboratoire",
    category: "workshops",
    date: "Session 2025",
    imageUrl: "/images/git.jpeg",
    description: "Les membres du club en pleine séance de travaux pratiques dans les laboratoires de l'ENSPD.",
    tags: ["Atelier", "Laboratoire", "Pratique"]
  }
];
