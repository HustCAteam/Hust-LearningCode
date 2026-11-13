import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { readJSON, catalog } from './scripts/lib.mjs';
import remarkLinks from './scripts/remark-links.mjs';

const materials = readJSON('data/materials.json');
const courses = catalog();
const ids = [...new Set(materials.map(material => material.course))];
export default defineConfig({
  site: 'https://hustcateam.github.io',
  base: '/Hust-LearningCode',
  srcDir: './docs',
  publicDir: './docs/public',
  trailingSlash: 'always',
  markdown: { remarkPlugins: [remarkLinks] },
  integrations: [starlight({
    title: '华科学码群',
    description: '学码群分享的教材、笔记、实验和学习实践。',
    defaultLocale: 'root',
    locales: { root: { label: '简体中文', lang: 'zh-CN' } },
    logo: { src: './docs/assets/ca.png', alt: 'HUST CA' },
    social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/HustCAteam/Hust-LearningCode' }],
    sidebar: [
      { slug: 'group', label: '学码群资料' },
      { slug: 'books', label: '群友分享的书籍' },
      { label: '学码群主题', items: ids.map(id => ({ slug: `group/${id}`, label: courses.find(course => course.id === id).title })) },
      { label: '动手学习', items: ['guide/start', 'guide/tools', 'guide/roadmap', 'guide/cpp-debugging', 'guide/curriculum'] },
      { label: '参与分享', items: ['guide/contributing', 'guide/credits'] },
      { label: '外部补充', collapsed: true, items: ['supplement/hust', 'supplement/csdiy'] },
    ],
  })],
});
