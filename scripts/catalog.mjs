import { bookEdition } from './lib.mjs';
export const kindLabels = { book: '书籍', slides: '讲义', notes: '笔记', lab: '实验', exercise: '试题与练习', source: '源程序', talk: '技术分享', guide: '指南' };
export const materialId = m => `${m.course}-${m.sha256.slice(0, 12)}`;
export const materialRoute = m => `group/${m.course}/files/${m.sha256.slice(0, 12)}`;
export const materialTitle = m => `${m.title}${bookEdition(m) ? ` · ${bookEdition(m)}` : ''}`;
export function groupBy(items, key) {
  return Object.groupBy(items, key);
}
