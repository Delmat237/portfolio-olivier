// Types pour les données du portfolio

export interface PersonalInfo {
  id?: string;
  name: string;
  title: string;
  subtitle: string;
  school: string;
  email: string;
  phone: string;
  location: string;
  birthDate: string;
  bio: string;
  avatar?: string;
}

export interface Education {
  id?: string;
  period: string;
  title: string;
  institution: string;
  details?: string;
  order: number;
}

export interface Skill {
  id?: string;
  name: string;
  category: string;
  icon: string;
  level?: number;
  order: number;
}

export interface Experience {
  id?: string;
  title: string;
  period: string;
  description: string;
  company?: string;
  location?: string;
  order: number;
}

export interface Project {
  id?: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  order: number;
}

export interface Sport {
  id?: string;
  name: string;
  order: number;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  education: Education[];
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  sports: Sport[];
}

export interface EditableSectionProps {
  section: keyof PortfolioData;
  title: string;
  data: unknown;
  onSave: (section: keyof PortfolioData, data: unknown) => Promise<void>;
}

// Types pour les réponses API
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Types pour les actions CRUD
export type CrudAction = 'create' | 'read' | 'update' | 'delete';

export interface CrudOperationResult {
  success: boolean;
  message: string;
  data?: unknown;
}