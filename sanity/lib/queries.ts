import { defineQuery } from "next-sanity";

export const projectsQuery = defineQuery(`
  *[_type == "project"] | order(order asc) {
    _id,
    _type,
    title,
    slug,
    description,
    coverImage,
    tags,
    liveUrl,
    githubUrl,
    featured,
    order
  }
`);

export const featuredProjectsQuery = defineQuery(`
  *[_type == "project" && featured == true] | order(order asc) {
    _id,
    _type,
    title,
    slug,
    description,
    coverImage,
    tags,
    liveUrl,
    githubUrl,
    featured,
    order
  }
`);

export const projectBySlugQuery = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    description,
    challenge,
    techStack,
    gallery[] {
      asset-> {
        _id,
        url
      }
    },
    coverImage,
    tags,
    liveUrl,
    githubUrl,
    featured,
    order
  }
`);

export const servicesQuery = defineQuery(`
  *[_type == "service"] | order(order asc) {
    _id,
    _type,
    title,
    description,
    icon,
    features,
    order
  }
`);