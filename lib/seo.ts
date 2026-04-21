/**
 * SEO Utilities for structured data and JSON-LD generation
 */

import { siteConfig, getCanonicalUrl } from "./config";

export interface PersonSchema {
  name: string;
  url: string;
  jobTitle: string;
  description: string;
  image?: string;
  sameAs?: string[];
  contactPoint?: {
    "@type": string;
    email: string;
    contactType: string;
  };
}

export const generatePersonSchema = (config: PersonSchema) => {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    ...config,
  };
};

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export const generateBreadcrumbSchema = (items: BreadcrumbItem[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};

export interface ProjectSchema {
  name: string;
  description: string;
  url: string;
  image?: string;
  creator?: string;
  datePublished?: string;
}

export const generateProjectSchema = (project: ProjectSchema) => {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.description,
    url: project.url,
    ...(project.image && { image: project.image }),
    ...(project.creator && { creator: { "@type": "Person", name: project.creator } }),
    ...(project.datePublished && { datePublished: project.datePublished }),
  };
};

// Re-export from config for backwards compatibility
export { siteConfig, getCanonicalUrl };
