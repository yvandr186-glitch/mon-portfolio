/**
 * Type definitions for the portfolio.
 * These mirror what would be Prisma models in a real backend.
 */

export type ID = string;

export interface Project {
  id: ID;
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  category: ProjectCategory;
  technologies: string[];
  featured: boolean;
  year: number;
  thumbnail: string;
  gallery: string[];
  github?: string;
  demo?: string;
  metrics?: { label: string; value: string }[];
}

export type ProjectCategory =
  | "Application Web"
  | "Mobile"
  | "Design System"
  | "Open Source"
  | "Branding";

export interface Article {
  id: ID;
  title: string;
  slug: string;
  excerpt: string;
  content: ArticleBlock[];
  category: string;
  tags: string[];
  cover: string;
  publishedAt: string;
  readingTime: number;
  featured: boolean;
  draft?: boolean;
  views: number;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
}

export type ArticleBlock =
  | { type: "heading"; level: 1 | 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "code"; language: string; code: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "callout"; variant: "info" | "warning" | "success"; text: string }
  | { type: "divider" };

export interface Testimonial {
  id: ID;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
}

export interface Service {
  id: ID;
  title: string;
  description: string;
  features: string[];
  icon: string;
}

export interface Skill {
  name: string;
  level: number;
  category: string;
}

export interface Stat {
  label: string;
  value: number;
  suffix: string;
  description: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
}

export interface NewsletterSubscriber {
  id: ID;
  email: string;
  subscribedAt: string;
  status: "active" | "unsubscribed" | "pending";
}

export interface AdminUser {
  id: ID;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
  avatar: string;
  joinedAt: string;
  lastActive: string;
  posts: number;
  status: "active" | "suspended";
}

export interface ContactMessage {
  id: ID;
  name: string;
  email: string;
  subject: string;
  message: string;
  receivedAt: string;
  status: "new" | "read" | "replied" | "archived";
}
