import ca from '@/assets/ca.png';
import navigation from './navigation.json';
import type { SidebarNavigation } from '@/lib/docs/types';
import type { ContentConfig, HeaderFeatures, LocaleConfig, NavItem, SiteConfig, SocialObjects } from '@/lib/types';

export const LOCALE: LocaleConfig = { lang: 'zh-CN' };
export const CONTENT: ContentConfig = { systems: [{ id: 'docs', dir: 'docs/content/docs', defaultDocRedirect: '/Hust-LearningCode/group/', route: '/Hust-LearningCode' }] };
export const SITE: SiteConfig = {
  website: 'https://hustcateam.github.io/Hust-LearningCode/',
  title: '学码群 · 共同的计算机书架',
  description: '华科学码群的教材、笔记、实验与代码。从群友的一次分享，走进一门感兴趣的课。',
  author: '华科学码群', authorUrl: '/Hust-LearningCode/guide/credits/',
  repo: 'https://github.com/HustCAteam/Hust-LearningCode', branch: 'main',
  image: ca, imageAlt: '华中科技大学计算机协会 CA 标志',
};
export const HEADER_FEATURES: HeaderFeatures = { enableGitHubButton: false, starCountThreshold: 0, enableLayoutWidthToggle: true };
export const HEADER_NAV_ITEMS: NavItem[] = [
  { href: '/Hust-LearningCode/group/', label: '资料目录' },
  { href: '/Hust-LearningCode/books/', label: '书架' },
  { href: '/Hust-LearningCode/guide/start/', label: '开始阅读' },
  { href: '/Hust-LearningCode/guide/credits/', label: '分享者' },
];
export const HEADER_SOCIAL_LINKS: SocialObjects[] = [{ name: 'github', href: SITE.repo, linkTitle: '学码群 GitHub 仓库', active: true }];
export const FOOTER_SOCIAL_LINKS = HEADER_SOCIAL_LINKS;
export const SIDEBAR_NAVIGATION = navigation as SidebarNavigation;
export const TABLE_OF_CONTENTS = { enableExtra: false };
