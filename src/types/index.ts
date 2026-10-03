export interface Track {
  id: string;
  name: string;
  shortCode: string;
  description: string;
  iconName: 'network' | 'code';
  imageUrl: string;
  technologies: string[];
  careers: string[];
  featuredTopics: string[];
  diploma: string;
}

export interface BureauMember {
  id: string;
  name: string;
  role: string;
  department: string;
  mandate: string; // '2025-2026' | '2024-2025'
  category: 'direction' | 'technique' | 'academique' | 'logistique';
  bio: string;
  avatarUrl: string;
  email?: string;
  github?: string;
  linkedin?: string;
  phone?: string;
}

export interface ProjectMilestone {
  title: string;
  status: 'completed' | 'in_progress' | 'planned';
  description: string;
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  description: string;
  category: 'logiciel' | 'reseau';
  status: 'completed' | 'active' | 'prototyping';
  leadName: string;
  leadRole: string;
  teamCount: number;
  progress: number;
  tags: string[];
  demoUrl?: string;
  repoUrl?: string;
  imageUrl: string;
  milestones: ProjectMilestone[];
  outcomes: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  category: 'academique' | 'maintenance' | 'formation' | 'developpement';
  summary: string;
  description: string;
  icon: string;
  deliverables: string[];
  targetAudience: string;
  averageTime: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'workshops' | 'ceremonies' | 'maintenance' | 'hackathons';
  date: string;
  imageUrl: string;
  description: string;
  tags: string[];
}

export interface ServiceRequestForm {
  fullName: string;
  email: string;
  phone: string;
  academicLevel: string;
  serviceType: string;
  deviceOrTopic: string;
  urgency: 'normale' | 'urgente';
  details: string;
}

export interface JoinFormData {
  fullName: string;
  matricule?: string;
  email: string;
  phone: string;
  level: string;
  preferredTrack: string;
  skills: string;
  motivation: string;
}
