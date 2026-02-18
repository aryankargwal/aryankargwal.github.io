import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    tags: z.array(z.string()),
    status: z.enum(['Production', 'Research Prototype', 'Active Development', 'Archived']),
    repoUrl: z.string().url().optional(),
    paperUrl: z.string().url().optional(),
    demoUrl: z.string().url().optional(),
    featured: z.boolean().default(false),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    tags: z.array(z.string()),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  projects,
  blog,
};
