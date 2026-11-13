import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import remarkLinks from './scripts/remark-links.mjs';

export default defineConfig({
  site: 'https://hustcateam.github.io',
  base: '/Hust-LearningCode',
  srcDir: './docs',
  publicDir: './docs/public',
  trailingSlash: 'always',
  prefetch: true,
  vite: { plugins: [tailwindcss()] },
  markdown: {
    remarkPlugins: [remarkLinks],
    shikiConfig: { themes: { light: 'one-light', dark: 'one-dark-pro' } },
  },
  integrations: [mdx(), react(), icon({ iconDir: 'docs/assets/icons', svgoOptions: { plugins: [{ name: 'convertColors', params: { currentColor: true } }] } }), sitemap()],
});
