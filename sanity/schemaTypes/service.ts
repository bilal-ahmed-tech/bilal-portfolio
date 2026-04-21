import { defineField, defineType } from "sanity";

export const serviceType = defineType({
  name: "service",
  title: "Service",
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
          .warning("Title should be between 2 and 60 characters for best display"),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (Rule) =>
        Rule.required()
          .min(10)
          .max(500)
          .warning("Description should be 20–300 characters for best readability"),
    }),
    defineField({
      name: "icon",
      title: "Icon Name",
      type: "string",
      description: "Lucide icon name e.g. 'monitor', 'briefcase', 'smartphone'",
      validation: (Rule) =>
        Rule.required()
          .regex(/^[a-zA-Z][a-zA-Z0-9-]*$/)
          .error("Icon name must start with a letter and may contain letters, numbers, or hyphens"),
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
      description: "Bullet points (3 recommended)",
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(10)
          .custom((features) => {
            // Type guard: ensure features is an array
            if (!features) return true;
            if (!Array.isArray(features)) {
              return "Features must be an array";
            }
            // Now TypeScript knows features is unknown[], we need to check each item
            for (let i = 0; i < features.length; i++) {
              const item = features[i];
              if (typeof item !== "string" || item.trim() === "") {
                return `Feature #${i + 1} cannot be empty.`;
              }
            }
            return true;
          }),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower number = shows first (optional, defaults to 50)",
      validation: (Rule) => Rule.integer().min(0).max(100),
      initialValue: 50,
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
  orderings: [
    {
      title: "Order (ascending)",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});