// sanity/schemaTypes/project.ts
import { defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(100)
          .warning(
            "Title should be between 2 and 60 characters for best display",
          ),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 2,
      description:
        "Brief summary shown on the home page project cards (max 160 characters recommended).",
      validation: (Rule) =>
        Rule.required()
          .min(20)
          .max(300)
          .warning(
            "Description should be 20–300 characters for best readability",
          ),
    }),
    defineField({
      name: "challenge",
      title: "Challenge",
      type: "text",
      rows: 4,
      description:
        "What problem did this project solve? Shown on the detail page only.",
    }),
    defineField({
      name: "techStack",
      title: "Tech Stack",
      type: "array",
      of: [{ type: "string" }],
      description:
        "List of technologies used (e.g., React, Next.js, Tailwind). Shown on the detail page.",
      validation: (Rule) =>
        Rule.unique()
          .min(1)
          .max(10)
          .custom((techStack) => {
            if (!techStack) return true;
            if (!Array.isArray(techStack)) return "Tech stack must be an array";
            for (let i = 0; i < techStack.length; i++) {
              const item = techStack[i];
              if (typeof item !== "string" || item.trim() === "") {
                return `Tech #${i + 1} cannot be empty`;
              }
            }
            return true;
          }),
    }),
    defineField({
      name: "gallery",
      title: "Gallery Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "Additional screenshots or images for the detail page.",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required().error("Cover image is required"),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      description: "e.g., React, Next.js, Tailwind CSS",
      validation: (Rule) =>
        Rule.unique()
          .min(1)
          .max(5)
          .warning("Add 3–5 tags for best results")
          .custom((tags) => {
            if (!tags) return true;
            if (!Array.isArray(tags)) return "Tags must be an array";
            for (let i = 0; i < tags.length; i++) {
              const tag = tags[i];
              if (typeof tag !== "string" || tag.trim() === "") {
                return `Tag #${i + 1} cannot be empty`;
              }
            }
            return true;
          }),
    }),
    defineField({
      name: "liveUrl",
      title: "Live URL",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https"],
          allowRelative: false,
        }).warning("Must be a valid URL starting with http:// or https://"),
    }),
    defineField({
      name: "githubUrl",
      title: "GitHub URL",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["https"],
          allowRelative: false,
        }).custom((url) => {
          if (!url) return true;
          if (typeof url !== "string") return "URL must be a string";
          if (!url.includes("github.com")) {
            return "Must be a valid GitHub URL";
          }
          return true;
        }),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
      description: "Show this project in the featured section on the home page",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower number = shows first (optional)",
      validation: (Rule) => Rule.integer().min(0).max(100),
      initialValue: 50,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
      media: "coverImage",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? subtitle.slice(0, 60) : "No description",
        media,
      };
    },
  },
  orderings: [
    {
      title: "Order (ascending)",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Featured first, then order",
      name: "featuredOrder",
      by: [
        { field: "featured", direction: "desc" },
        { field: "order", direction: "asc" },
      ],
    },
  ],
});
