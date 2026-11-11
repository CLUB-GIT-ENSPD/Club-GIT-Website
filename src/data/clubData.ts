import { Track, BureauMember, Project, ServiceItem, GalleryItem } from '../types';

export const CLUB_META = {
  name: "Club GIT · ENSPD",
  fullName: "Club Génie Informatique & Télécommunications",
  institution: "École Nationale Supérieure Polytechnique de Douala (ENSPD)",
  university: "Université de Douala, Cameroun",
  motto: "L'excellence par le code, l'infrastructure et l'innovation collaborative.",
  campus: "Campus de Ndogbong / PK17, Douala",
  email: "clubgitenspd13@gmail.com",
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
    { value: "+100", label: "Membres Actifs", detail: "Étudiants ingénieurs du cycle polytechnicien" },
    { value: "2", label: "Filières d'Ingénierie", detail: "Génie Logiciel (GLO) & Réseaux Télécoms (GRT)" },
    { value: "5+", label: "Projets & Hackathons", detail: "Solutions concrètes développées pour le campus" },
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
    imageUrl: "/images/glo.jpg",
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
    imageUrl: "/images/grt.jpg",
    technologies: ["Cisco IOS", "MikroTik RouterOS", "Fibre Optique & FTTH", "Wireshark", "Linux Administration", "VoIP / Asterisk", "BGP / OSPF"],
    careers: ["Ingénieur Réseaux & Télécoms", "Administrateur Systèmes & Infrastructure", "Ingénieur Transmission & Déploiement", "Architecte Réseau Cloud"],
    featuredTopics: ["Routage IP dynamique & SDN", "Réseaux d'opérateurs mobiles 4G/5G", "Infrastructures Datacenter & Virtualisation", "Téléphonie IP et communication unifiée"],
    diploma: "Diplôme d'Ingénieur de Conception (Bac +5)"
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "soutenance-portal",
    title: "Soutenances ENSPD — Services Graphiques Professionnels",
    summary: "Plateforme web unifiée permettant la gestion visuelle des soutenances et des supports de présentation pour les étudiants et les jurys d'examen.",
    description: "Conçu et maintenu par le club GIT pour assurer votre identité visuelle ainsi que les supports de présentations lors de votre soutenance.",
    category: "logiciel",
    status: "completed",
    leadName: "TSEFACK KLEIN",
    leadRole: "Responsable des formations (Adjoint)",
    teamCount: 6,
    progress: 100,
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
    demoUrl: "https://soutenance-silk.vercel.app/",
    repoUrl: "https://github.com/CLUB-GIT-ENSPD/SOUTENANCE-ENSPD",
    imageUrl: "/images/soutenances.png",
    milestones: [
      { title: "Cahier des charges & Ateliers UI/UX", status: "completed", description: "Enquêtes auprès des 500 étudiants de l'école et maquettage interactif." },
      { title: "Développement du Backend & API REST", status: "completed", description: "Architecture sécurisée avec authentification JWT et base relationnelle." },
      { title: "Intégration Frontend & Responsive Design", status: "completed", description: "Interface optimisée mobile pour les connexions à bande passante réduite." },
      { title: "Mise en production & Formation des délégués", status: "completed", description: "Hébergement sur serveur dédié campus et maintenance continue." }
    ],
    outcomes: [
      "+1 10 projets et identitées soumises",
      "89.8% de disponibilité lors des périodes de soutenances",
    ]
  },
  {
    id: "club-git-app",
    title: "Club GIT : Application mobile membre",
    summary: "Plateforme d'espace membre pour les membres du club GIT.",
    description: "Projet mené par les équipes projet du club pour assurer un suivis des membres et de leurs activités au sein du club.",
    category: "logiciel",
    status: "active",
    leadName: "NJOH MASSANGO",
    leadRole: "Responsable des Projets",
    teamCount: 4,
    progress: 85,
    tags: ["SNMP", "Python", "Prometheus", "Grafana", "MikroTik"],
    demoUrl: "front-git-black.vercel.app",
    repoUrl: "https://github.com/CLUB-GIT-ENSPD/CLUB-GIT",
    imageUrl: "/images/club-git.png",
    milestones: [
{ title: "Cahier des charges & Ateliers UI/UX", status: "completed", description: "Enquêtes auprès des 500 étudiants de l'école et maquettage interactif." },
      { title: "Développement du Backend & API REST", status: "completed", description: "Architecture sécurisée avec authentification JWT et base relationnelle." },
      { title: "Intégration Frontend & Responsive Design", status: "completed", description: "Interface optimisée mobile pour les connexions à bande passante réduite." },
      { title: "Mise en production & Formation des délégués", status: "completed", description: "Hébergement sur serveur dédié campus et maintenance continue." }
    ],
    outcomes: [
      "Gamification du suivis membre",
      "Gestion de la présence aux réunions et aux activités",
      "Gestion et supervision des projets"
    ]
  },
  // {
  //   id: "opencode-enspd",
  //   title: "OpenCode ENSPD · Plateforme d'Algorithmique",
  //   summary: "Système d'évaluation automatique de code (Online Judge) pour l'entraînement aux algorithmes et aux structures de données.",
  //   description: "Développé pour les étudiants des cycles préparatoire et ingénieur, OpenCode permet de tester la complexité temporelle et spatiale des algorithmes soumis en C, C++, Python et Java avec des jeux de tests automatisés.",
  //   category: "logiciel",
  //   status: "active",
  //   leadName: "Boris Fotso",
  //   leadRole: "Lead Algorithmique & Dév (GLO)",
  //   teamCount: 4,
  //   progress: 80,
  //   tags: ["Go", "React", "Docker", "PostgreSQL", "Linux Sandbox"],
  //   demoUrl: "https://opencode.clubgit-enspd.cm",
  //   repoUrl: "https://github.com/CLUB-GIT-ENSPD/opencode",
  //   imageUrl: "/images/photo4.jpg",
  //   milestones: [
  //     { title: "Architecture du runner sécurisé en sandbox", status: "completed", description: "Exécution isolée des codes étudiants avec quotas stricts de CPU et mémoire." },
  //     { title: "Banque d'exercices de travaux dirigés", status: "completed", description: "Intégration de 80 problèmes avec tests unitaires et validation." },
  //     { title: "Organisation des sessions de concours live", status: "in_progress", description: "Classement en temps réel pour les marathons d'algorithmique." }
  //   ],
  //   outcomes: [
  //     "+350 soumissions de code validées par semaine",
  //     "Augmentation notable des moyennes en algorithmique au premier cycle"
  //   ]
  // },
  // {
  //   id: "hardware-clinic-portal",
  //   title: "KamerClinic · Plateforme Clinique PC & Télécoms",
  //   summary: "Application de ticketing et suivi des interventions de maintenance matérielle et réseau offertes aux étudiants.",
  //   description: "Permet aux étudiants de réserver un créneau de maintenance pour leur ordinateur portable, de suivre en direct l'état du diagnostic (dépoussiérage, remplacement de pâte thermique, réinstallation OS) et d'évaluer la prestation.",
  //   category: "reseau",
  //   status: "completed",
  //   leadName: "Arnaud Fomekong",
  //   leadRole: "Responsable Pôle Maintenance (GRT)",
  //   teamCount: 3,
  //   progress: 100,
  //   tags: ["Vue.js", "Express", "SQLite", "Tailwind CSS"],
  //   demoUrl: "https://clinic.clubgit-enspd.cm",
  //   repoUrl: "https://github.com/CLUB-GIT-ENSPD/kamerclinic",
  //   imageUrl: "/images/maintenance.jpg",
  //   milestones: [
  //     { title: "Définition du protocole de maintenance", status: "completed", description: "Checklist de diagnostic hardware et sauvegarde des données." },
  //     { title: "Développement de la plateforme de prise de RDV", status: "completed", description: "Système de ticket avec notifications par SMS / WhatsApp." },
  //     { title: "Bilan opérationnel semestriel", status: "completed", description: "Plus de 200 ordinateurs portables remis en parfait état de marche." }
  //   ],
  //   outcomes: [
  //     "+240 PC portables pris en charge avec succès depuis le lancement",
  //     "Dépannage rapide et tarifs étudiants transparents",
  //     "Formation pratique aux pannes hardware pour 15 techniciens juniors"
  //   ]
  // }
];

export const BUREAU_MANDATES = [
  { id: "2026", label: "Mandat 2026" },
  { id: "2024-2025", label: "Mandat 2024-2025" }
] as const;

export const BUREAU_MEMBERS: BureauMember[] = [
  {
    id: "b25-pres",
    name: "Ngooh Agnes Serena",
    role: "Présidente",
    department: "Génie Logiciel (GLO)",
    mandate: "2026",
    category: "direction",
    bio: "Définit les orientations du Club GIT, coordonne l'action du bureau et représente le club auprès de l'ENSPD, de ses membres et de ses partenaires.",
    avatarUrl: "/images/ngooh-agnes-serena.jpeg"
  },
  {
    id: "b25-sg",
    name: "Nzeutem Eunice",
    role: "Secrétaire générale",
    department: "Génie Logiciel (GLO)",
    mandate: "2026",
    category: "direction",
    bio: "Assure le suivi administratif du club, rédige les comptes rendus des réunions, conserve les documents officiels et tient à jour les informations relatives aux membres.",
    avatarUrl: "/images/nzeutem-eunice.jpeg"
  },
  {
    id: "b25-com-adj",
    name: "Ombessa Gododo Wilfred",
    role: "Responsable Adjoint Communication",
    department: "Génie Civil (GCI)",
    mandate: "2026",
    category: "logistique",
    bio: "Appuie le responsable de la communication dans la préparation et la diffusion des annonces et contenus du club, ainsi que dans la couverture de ses activités.",
    avatarUrl: "/images/ombessa-gododo-wilfred.jpeg"
  },
  {
    id: "b25-acad-charge",
    name: "Yonga Tiani Aristide Florent",
    role: "Chargé des Affaires Académiques",
    department: "Génie Réseau & Télécommunications (GRT)",
    mandate: "2026",
    category: "academique",
    bio: "Coordonne les initiatives d'entraide et d'accompagnement académiques du club, notamment les séances de soutien et le partage de ressources entre étudiants.",
    avatarUrl: "/images/yonga-tiani-aristide-florent.jpeg"
  },
  {
    id: "b25-maint-charge",
    name: "Cheuwa Sylvestre Luther",
    role: "Chargé de la Maintenance Informatique",
    department: "Génie Réseau & Télécommunications (GRT)",
    mandate: "2026",
    category: "maintenance",
    bio: "Coordonne les activités de maintenance informatique du club : diagnostic des pannes, assistance aux utilisateurs et suivi des interventions sur les équipements.",
    avatarUrl: "/images/cheuwa-luther.jpg"
  },
  {
    id: "b25-maint-adj",
    name: "Ngambi Ypecheun Wilfried",
    role: "Chargé de la Maintenance Adjoint",
    department: "Génie Logiciel (GLO)",
    mandate: "2026",
    category: "maintenance",
    bio: "Assiste le responsable de la maintenance informatique dans le diagnostic des pannes, l'assistance aux utilisateurs et le suivi des interventions sur les équipements.",
    avatarUrl: "/images/ngambi-wilfried.jpg"
  },
  {
    id: "b25-censeur-charge",
    name: "Atekoumbo Excel",
    role: "Censeur",
    department: "Génie Logiciel (GLO)",
    mandate: "2026",
    category: "direction",
    bio: "Cette fonction contribue au respect des règles de fonctionnement du club et au bon déroulement de ses activités. Elle assure un suivi de la discipline et porte à l'attention du bureau les situations qui le nécessitent.",
    avatarUrl: "/images/unknow.jpg"
  },
  {
    id: "b25-com-charge",
    name: "Tiemouo Djiolio Dorcas",
    role: "Responsable Communication",
    department: "Génie Logiciel (GLO)",
    mandate: "2026",
    category: "communication",
    bio: "Prépare et diffuse les informations du club auprès de ses membres et du public, valorise ses activités et veille à la cohérence de ses communications.",
    avatarUrl: "/images/tiemouo-dorcas.jpg"
  },
  {
    id: "b25-tresor",
    name: "Signing Tsango Marilyne",
    role: "Trésorière",
    department: "Génie Logiciel (GLO)",
    mandate: "2026",
    category: "direction",
    bio: "Suit les recettes et les dépenses du club, contribue à la préparation du budget et rend compte de la situation financière au bureau.",
    avatarUrl: "/images/unknow.jpg"
  },
  {
    id: "b25-commis-compte",
    name: "Lambowo Dongmo Darius",
    role: "Commissaire aux comptes",
    department: "Génie Logiciel (GLO)",
    mandate: "2026",
    category: "direction",
    bio: "Vérifie les pièces justificatives et les opérations financières du club, puis rend compte de ses contrôles afin de contribuer à une gestion transparente.",
    avatarUrl: "/images/unknow.jpg"
  },
  {
    id: "b25-commis-compte",
    name: "Tsana Georis",
    role: "Commissaire aux comptes",
    department: "Génie Logiciel (GLO)",
    mandate: "2026",
    category: "direction",
    bio: "Vérifie les pièces justificatives et les opérations financières du club, puis rend compte de ses contrôles afin de contribuer à une gestion transparente.",
    avatarUrl: "/images/unknow.jpg"
  },
  {
    id: "b25-logis-charge",
    name: "Se Banack Emilie",
    role: "Responsable de la Logistique",
    department: "Génie Logiciel (GLO)",
    mandate: "2026",
    category: "direction",
    bio: "Prépare les moyens matériels nécessaires aux réunions et événements du club : recense les besoins, organise la mise à disposition du matériel et en suit le rangement.",
    avatarUrl: "/images/unknow.jpg"
  },
  {
    id: "b25-vice-pres",
    name: "Ngouh Ngalle Christianne",
    role: "Vice-Présidente",
    department: "Génie Réseau & Télécommunications (GRT)",
    mandate: "2026",
    category: "direction",
    bio: "Seconde la présidente dans la coordination du bureau et le suivi des activités, et la représente lorsqu'elle ne peut être présente.",
    avatarUrl: "/images/unknow.jpg"
  },
   {
    id: "b25-projet-charge",
    name: "Njoh Massango Adolphe",
    role: "Responsable des Projets",
    department: "Génie Logiciel (GLO)",
    mandate: "2026",
    category: "direction",
    bio: "Recueille et suit les projets du club, coordonne les équipes qui les réalisent et veille à l'avancement des travaux jusqu'à leur présentation ou livraison.",
    avatarUrl: "/images/njoh-massango.jpg"
  },
  {
    id: "b25-projet-adj",
    name: "Assongue Tatang Muriel",
    role: "Responsable Adjoint des Projets",
    department: "Génie Logiciel (GLO)",
    mandate: "2026",
    category: "direction",
    bio: "Appuie le responsable des projets dans la coordination des équipes, le suivi de l'avancement et la préparation des livrables.",
    avatarUrl: "/images/unknow.jpg"
  },

  {
    id: "b25-ext-charge",
    name: "Made Beyaga Gladys",
    role: "Responsable des Affaires Externes",
    department: "Génie Réseau & Télécommunications (GRT)",
    mandate: "2026",
    category: "direction",
    bio: "Développe et entretient les relations du club avec les partenaires, les institutions et les autres organisations, et facilite les échanges autour de ses activités.",
    avatarUrl: "/images/made-gladys.jpg"
  },
  {
    id: "b25-form-adj",
    name: "Tsefack Calvin Klein",
    role: "Responsable des Affaires Académiques Adjoint des Formations ",
    department: "Génie Logiciel (GLO)",
    mandate: "2026",
    category: "direction",
    bio: "Contribue à la préparation et à l'organisation des formations techniques du club, en aidant à mobiliser les intervenants et à adapter les contenus aux besoins des membres.",
    avatarUrl: "/images/unknow.jpg"
  },
  {
    id: "b25-sg-adj",
    name: "Douanla Ange",
    role: "Secrétaire Général Adjoint",
    department: "Génie Réseau & Télécommunications (GRT)",
    mandate: "2026",
    category: "direction",
    bio: "Appuie le secrétaire général dans le suivi administratif, la rédaction des comptes rendus et la conservation des documents officiels.",
    avatarUrl: "/images/douanla-ange.jpg"
  },

  // mandat de 2024/2025
  // Exemple à copier puis compléter pour ajouter un membre de l'ancien bureau :
  // {
  //   id: "b24-president",
  //   name: "Nom complet",
  //   role: "Président(e) du club",
  //   department: "Filière ou département",
  //   mandate: "2024-2025",
  //   category: "direction",
  //   bio: "Présentez brièvement ses missions au sein du club.",
  //   avatarUrl: "/images/photo1.jpg"
  // },
  {
    id: "b24-president",
    name: "Mongue-Mouyeme Aime Charles",
    role: "Président",
    department: "Génie Logiciel (GLO)",
    mandate: "2024-2025",
    category: "direction",
    bio: "Définit les orientations du Club GIT, coordonne l'action du bureau et représente le club auprès de l'ENSPD, de ses membres et de ses partenaires.",
    avatarUrl: "/images/unknow.jpg"
  },
   {
    id: "b24-sg",
    name: "Tchamgoue Deugoue Franck",
    role: "Secrétaire Général",
    department: "Génie Logiciel (GLO)",
    mandate: "2024-2025",
    category: "direction",
    bio: "Assure le suivi administratif du club, rédige les comptes rendus des réunions, conserve les documents officiels et tient à jour les informations relatives aux membres.",
    avatarUrl: "/images/unknow.jpg"
  },
  {
    id: "b24-sg-adj",
    name: "Nzeutem Eunice",
    role: "Secrétaire Général Adjoint",
    department: "Génie Logiciel (GLO)",
    mandate: "2024-2025",
    category: "direction",
    bio: "Appuie le secrétaire général dans le suivi administratif, la rédaction des comptes rendus et la conservation des documents officiels.",
    avatarUrl: "/images/nzeutem-eunice.jpeg"
  },
  {
    id: "b24-com-adj",
    name: "Tiemouo Djiolio Dorcas",
    role: "Responsable Adjoint Communication",
    department: "Génie Logiciel (GLO)",
    mandate: "2024-2025",
    category: "communication",
    bio: "Appuie le responsable de la communication dans la préparation et la diffusion des annonces et contenus du club, ainsi que dans la couverture de ses activités.",
    avatarUrl: "/images/tiemouo-dorcas.jpg"
  },
  {
    id: "b24-com-charge",
    name: "Linjouom Alain Pascal",
    role: "Responsable Communication",
    department: "Génie Logiciel (GLO)",
    mandate: "2024-2025",
    category: "communication",
    bio: "Coordonne la communication interne et externe du club, prépare et diffuse les annonces et contenus, et veille à la visibilité de ses activités auprès des membres et du public.",
    avatarUrl: "/images/unknow.jpg"
  },
  {
    id: "b24-vice-pres",
    name: "Ngooh Agnes Serena",
    role: "Vice-Présidente",
    department: "Génie Logiciel (GLO)",
    mandate: "2024-2025",
    category: "direction",
    bio: "Seconde le président dans la coordination du bureau et le suivi des activités, et le représente lorsqu'il ne peut être présent.",
    avatarUrl: "/images/ngooh-agnes-serena.jpeg"
  },
    {
      id: "b24-tresor",
      name: "Eken Kom Carmel",
      role: "Trésorière",
      department: "Génie Logiciel (GLO)",
      mandate: "2024-2025",
      category: "direction",
      bio: "Suit les recettes et les dépenses du club, contribue à la préparation du budget et rend compte de la situation financière au bureau.",
      avatarUrl: "/images/unknow.jpg"
    },
  {
    id: "b24-commis-compte",
    name: "Tamba Foka Adrien",
    role: "Commissaire aux Comptes",
    department: "Génie Logiciel (GLO)",
    mandate: "2024-2025",
    category: "direction",
    bio: "Vérifie les pièces justificatives et les opérations financières du club, puis rend compte de ses contrôles afin de contribuer à une gestion transparente.",
    avatarUrl: "/images/unknow.jpg"
  },
  {
    id: "b24-commis-compte",
    name: "Signing Tsango Marilyne",
    role: "Commissaire aux Comptes",
    department: "Génie Logiciel (GLO)",
    mandate: "2024-2025",
    category: "direction",
    bio: "Vérifie les pièces justificatives et les opérations financières du club, puis rend compte de ses contrôles afin de contribuer à une gestion transparente.",
    avatarUrl: "/images/unknow.jpg"
  },
  {
    id: "b24-logis-charge",
    name: "TAKAMTE Kamga Joan",
    role: "Responsable de la Logistique",
    department: "Génie Logiciel (GLO)",
    mandate: "2024-2025",
    category: "direction",
    bio: "Prépare les moyens matériels nécessaires aux réunions et événements du club : recense les besoins, organise la mise à disposition du matériel et en suit le rangement.",
    avatarUrl: "/images/unknow.jpg"
  },
  {
    id: "b24-projet-charge",
    name: "Nguetsa Kryss",
    role: "Responsable des Projets",
    department: "Génie Logiciel (GLO)",
    mandate: "2024-2025",
    category: "direction",
    bio: "Recueille et suit les projets du club, coordonne les équipes qui les réalisent et veille à l'avancement des travaux jusqu'à leur présentation ou livraison.",
    avatarUrl: "/images/unknow.jpg"
  },
  {
    id: "b24-projet-adj",
    name: "Djoukeng Jovanie Briyana",
    role: "Responsable des Projets Adjoint",
    department: "Génie Logiciel (GLO)",
    mandate: "2024-2025",
    category: "direction",
    bio: "Appuie le responsable des projets dans la coordination des équipes, le suivi de l'avancement et la préparation des livrables.",
    avatarUrl: "/images/unknow.jpg"
  },

  {
    id: "b24-ext-charge",
    name: "Domtchueng Ryan",
    role: "Responsable des Affaires Externes",
    department: "Génie Logiciel (GLO)",
    mandate: "2024-2025",
    category: "direction",
    bio: "Développe et entretient les relations du club avec les partenaires, les institutions et les autres organisations, et facilite les échanges autour de ses activités.",
    avatarUrl: "/images/unknow.jpg"
  },
  {
    id: "b24-form-charge",
    name: "Bikond Maurice Arthur",
    role: "Responsable des Formations",
    department: "Génie reseau et télécoms (GRT)",
    mandate: "2024-2025",
    category: "direction",
    bio: "Prépare et coordonne les formations techniques du club, en identifiant les besoins des membres et en veillant à la pertinence des contenus et des intervenants.",
    avatarUrl: "/images/unknow.jpg"
  },
 
  {
    id: "b24-censeur-charge",
    name: "Sepiebou Vianney",
    role: "Censeur",
    department: "Génie Logiciel (GLO)",
    mandate: "2024-2025",
    category: "direction",
    bio: "Cette fonction contribue au respect des règles de fonctionnement du club et au bon déroulement de ses activités. Elle assure un suivi de la discipline et porte à l'attention du bureau les situations qui le nécessitent.",
    avatarUrl: "/images/unknow.jpg"
  },
  {
    id: "b24-censeur-charge",
    name: "Souop Metse Evora",
    role: "Censeur",
    department: "Génie Logiciel (GLO)",
    mandate: "2024-2025",
    category: "direction",
    bio: "Cette fonction contribue au respect des règles de fonctionnement du club et au bon déroulement de ses activités. Elle assure un suivi de la discipline et porte à l'attention du bureau les situations qui le nécessitent.",
    avatarUrl: "/images/unknow.jpg"
  },
  {
    id: "b24-censeur-charge",
    name: "Dikongue Friedrich",
    role: "Censeur",
    department: "Génie Automobile & Mécatronique (GAM)",
    mandate: "2024-2025",
    category: "direction",
    bio: "Cette fonction contribue au respect des règles de fonctionnement du club et au bon déroulement de ses activités. Elle assure un suivi de la discipline et porte à l'attention du bureau les situations qui le nécessitent.",
    avatarUrl: "/images/unknow.jpg"
  },
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

/**
 * Formulaire d'audition natif intégré à la page /rejoindre.
 * Les candidatures sont enregistrées dans le fichier JSON du serveur
 * (ou dans le navigateur en repli si l'API est indisponible).
 */
export const AUDITION_FORM = {
  questionsCount: 24,
  levelQuestionsCount: 15,
  durationLabel: "15 à 20 minutes",
} as const;
