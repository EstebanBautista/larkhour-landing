import { defineField, defineType } from "sanity";
import { sectionTypes } from "./sections";

const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "siteName", type: "string", validation: (r) => r.required() }),
    defineField({ name: "seoTitle", title: "Default SEO title", type: "string", validation: (r) => r.required().max(60) }),
    defineField({ name: "seoDescription", title: "Default SEO description", type: "text", rows: 2, validation: (r) => r.required().max(160) }),
    defineField({ name: "ogImage", title: "Open Graph image override", type: "image" }),
    defineField({ name: "disclaimer", title: "Demo notice", type: "string", validation: (r) => r.required() }),
    defineField({ name: "repoUrl", type: "url" }),
    defineField({ name: "videoUrl", title: "CMS walkthrough video", type: "url" }),
  ],
});

const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "price", title: "Price (USD)", type: "number", validation: (r) => r.required().positive() }),
    defineField({ name: "deposit", title: "Deposit (USD)", type: "number", validation: (r) => r.required().positive() }),
    defineField({ name: "shipDate", title: "Ship date label", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "finishes",
      type: "array",
      validation: (r) => r.required().length(2),
      of: [
        {
          type: "object",
          name: "finish",
          fields: [
            defineField({ name: "key", type: "string", options: { list: ["a", "b"] }, validation: (r) => r.required() }),
            defineField({ name: "name", type: "string", validation: (r) => r.required() }),
            defineField({ name: "color", type: "string", description: "Hex colour, such as #E9E2D0", validation: (r) => r.required().regex(/^#[0-9a-fA-F]{6}$/) }),
          ],
        },
      ],
    }),
  ],
});

const page = defineType({
  name: "page",
  title: "Landing page",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "seoTitle", title: "SEO title", type: "string", validation: (r) => r.max(60) }),
    defineField({ name: "seoDescription", title: "SEO description", type: "text", rows: 2, validation: (r) => r.max(160) }),
    defineField({ name: "sections", type: "array", of: sectionTypes.map((s) => ({ type: s.name })) }),
  ],
});

export const schemaTypes = [siteSettings, product, page, ...sectionTypes];
