export type ProjectCategory = 'all' | 'backend' | 'frontend' | 'infra';

export interface Project {
  id: string;
  index: string;
  category: 'backend' | 'frontend' | 'infra';
  type: string;
  title: string;
  description: string;
  metric: string;
  stack: string[];
  links?: {
    label: string;
    href: string;
    external?: boolean;
  }[];
  featured?: boolean;
  layout?: 'wide' | 'tall' | 'standard';
}

export interface Experience {
  id: string;
  period: string;
  current?: boolean;
  role: string;
  company: string;
  focus: string;
  location?: string;
  stack: string[];
  bullets?: string[];
}

export interface SkillBar {
  name: string;
  level: number;
  label: string;
}

export interface Education {
  period: string;
  degree: string;
  institution: string;
  description?: string;
}

export interface Certification {
  year: string;
  name: string;
  organization: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

