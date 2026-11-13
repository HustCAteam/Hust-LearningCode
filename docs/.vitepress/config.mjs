import { defineConfig } from 'vitepress';
import { readFileSync } from 'node:fs';
import { catalog } from '../../scripts/lib.mjs';
import { materialLinks } from './material-links.mjs';
const load = name => JSON.parse(readFileSync(new URL(`../../data/${name}.json`, import.meta.url), 'utf8'));
const courses = catalog();
const materials = load('materials');
const base = '/Hust-LearningCode/';
const categories = load('categories');

export default defineConfig({
  lang: 'zh-CN',
  title: '华科学码群',
  description: '把学过的东西留下来，把好资料传下去。华科学码群课程资料与学习手册。',
  base,
  cleanUrls: false,
  lastUpdated: false,
  head: [['meta', { name: 'theme-color', content: '#215e4f' }]],
  themeConfig: {
    logo: '/mark.svg',
    siteTitle: '学码群 · 学习手册',
    nav: [
      { text: '课程目录', link: '/courses/' },
      { text: '群内资料', link: '/group/' },
      { text: '自学入口', link: '/selfstudy/' },
      { text: '一起补充', link: '/guide/contributing' }
    ],
    sidebar: [
      { text: '从这里开始', items: [
        { text: '使用这本手册', link: '/guide/start' },
        { text: '学习路线', link: '/guide/roadmap' },
        { text: '工具与学习习惯', link: '/guide/tools' },
        { text: '华科培养方案', link: '/guide/curriculum' }
      ] },
      ...Object.entries(categories).map(([key, title]) => ({
        text: title, collapsed: true,
        items: courses.filter(c => c.category === key).map(c => ({ text: c.title, link: `/courses/${c.category}/${c.id}` }))
      })),
      { text: '共同维护', collapsed: false, items: [
        { text: '群内资料', link: '/group/' },
        { text: '自学课程与工具', link: '/selfstudy/' },
        { text: '补充资料', link: '/guide/contributing' },
        { text: '贡献与致谢', link: '/guide/credits' },
        { text: '维护与部署', link: '/guide/maintenance' },
        { text: '来源与版本', link: '/guide/sources' }
      ] }
    ],
    search: { provider: 'local', options: { locales: { root: { translations: {
      button: { buttonText: '搜索手册', buttonAriaLabel: '搜索手册' },
      modal: { displayDetails: '显示详情', resetButtonTitle: '清空搜索', backButtonTitle: '返回', noResultsText: '没有找到相关内容', footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' } }
    } } } } },
    outline: { label: '本页目录', level: [2, 3] },
    docFooter: { prev: '上一篇', next: '下一篇' },
    darkModeSwitchLabel: '切换深色模式',
    sidebarMenuLabel: '目录',
    returnToTopLabel: '回到顶部',
    editLink: { pattern: 'https://github.com/HustCAteam/Hust-LearningCode/edit/main/docs/:path', text: '在 GitHub 上改进这页', },
    socialLinks: [{ icon: 'github', link: 'https://github.com/HustCAteam/Hust-LearningCode' }],
    footer: { message: '把学过的东西留下来，把好资料传下去。', copyright: '华科学码群 · 由群友共同整理' }
  },
  markdown: { lineNumbers: true, config: md => materialLinks(md, materials, base) },
  sitemap: { hostname: 'https://hustcateam.github.io/Hust-LearningCode/' }
});
