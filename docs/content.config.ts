import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const collections = {
  docs: defineCollection({
    loader: glob({
      pattern: '**/*.{md,mdx}',
      base: './docs/content/docs',
      generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, '').replace(/\/index$/, ''),
    }),
    schema: z.object({
      title: z.string(), description: z.string().default(''),
      draft: z.boolean().default(false), authors: z.array(z.string()).default([]),
      navLabel: z.string().optional(), navIcon: z.string().optional(),
      navHidden: z.boolean().default(false), hide_breadcrumbs: z.boolean().default(false),
      materialId: z.string().optional(), source: z.string().optional(),
    }),
  }),
};
