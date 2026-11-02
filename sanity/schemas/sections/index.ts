import { defineArrayMember, defineField, defineType } from "sanity";

const str = (name: string, title?: string) =>
  defineField({ name, title, type: "string", validation: (r) => r.required() });
const txt = (name: string, title?: string) =>
  defineField({ name, title, type: "text", rows: 3, validation: (r) => r.required() });
const preview = (field: string, subtitle: string) => ({
  select: { title: field },
  prepare: ({ title }: { title?: string }) => ({ title, subtitle }),
});

export const heroSection = defineType({
  name: "heroSection",
  title: "Hero",
  type: "object",
  fields: [str("headline"), defineField({ name: "subhead", type: "text", rows: 3 }), str("ctaLabel", "CTA label")],
  preview: preview("headline", "Hero"),
});

export const compareSection = defineType({
  name: "compareSection",
  title: "Comparison",
  type: "object",
  fields: [str("heading"), txt("body"), str("alarmLabel"), str("larkhourLabel"), txt("alarmCaption"), txt("larkhourCaption")],
  preview: preview("heading", "Comparison"),
});

export const configuratorSection = defineType({
  name: "configuratorSection",
  title: "Configurator",
  type: "object",
  fields: [
    str("heading"),
    txt("body"),
    defineField({
      name: "defaultWakeTime",
      type: "string",
      description: "24-hour HH:MM",
      validation: (r) => r.required().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
    }),
    defineField({ name: "defaultDuration", type: "number", options: { list: [10, 20, 30, 45] }, validation: (r) => r.required() }),
    defineField({ name: "sounds", type: "array", of: [{ type: "string" }], validation: (r) => r.required().min(1) }),
  ],
  preview: preview("heading", "Configurator"),
});

export const anatomySection = defineType({
  name: "anatomySection",
  title: "Anatomy",
  type: "object",
  fields: [
    str("heading"),
    defineField({ name: "body", type: "text", rows: 3 }),
    defineField({
      name: "points",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "anatomyPoint",
          fields: [
            str("title"),
            txt("body"),
            defineField({ name: "x", type: "number", description: "Horizontal position, 0 to 100", validation: (r) => r.required().min(0).max(100) }),
            defineField({ name: "y", type: "number", description: "Vertical position, 0 to 100", validation: (r) => r.required().min(0).max(100) }),
          ],
        }),
      ],
    }),
  ],
  preview: preview("heading", "Anatomy"),
});

export const promisesSection = defineType({
  name: "promisesSection",
  title: "Promises",
  type: "object",
  fields: [
    str("heading"),
    defineField({ name: "promises", type: "array", of: [defineArrayMember({ type: "object", name: "promise", fields: [str("title"), txt("body")] })] }),
    defineField({ name: "quotes", type: "array", of: [defineArrayMember({ type: "object", name: "quote", fields: [txt("text"), str("attribution")] })] }),
  ],
  preview: preview("heading", "Promises"),
});

export const reserveSection = defineType({
  name: "reserveSection",
  title: "Reservation",
  type: "object",
  fields: [str("heading"), txt("body"), str("ctaLabel", "Submit label"), txt("demoNote"), txt("successMessage")],
  preview: preview("heading", "Reservation"),
});

export const faqSection = defineType({
  name: "faqSection",
  title: "FAQ",
  type: "object",
  fields: [
    str("heading"),
    defineField({
      name: "items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "faqItem",
          fields: [str("question"), defineField({ name: "answer", type: "array", of: [{ type: "block" }], validation: (r) => r.required() })],
          preview: { select: { title: "question" } },
        }),
      ],
    }),
  ],
  preview: preview("heading", "FAQ"),
});

export const closingSection = defineType({
  name: "closingSection",
  title: "Closing",
  type: "object",
  fields: [str("headline"), defineField({ name: "body", type: "text", rows: 2 }), str("ctaLabel", "CTA label")],
  preview: preview("headline", "Closing"),
});

export const sectionTypes = [
  heroSection,
  compareSection,
  configuratorSection,
  anatomySection,
  promisesSection,
  reserveSection,
  faqSection,
  closingSection,
];
