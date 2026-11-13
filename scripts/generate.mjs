import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';
import { ROOT, readJSON, catalog, encodePath, mdText, size, storageRoots, storageRoot, materialMarkdown, syncPublicMaterials, siteLink } from './lib.mjs';
import { learningPlan } from './plans.mjs';

const courses = catalog();
const materials = readJSON('data/materials.json');
const studies = readJSON('data/selfstudy.json');
const categories = readJSON('data/categories.json');
const sources = readJSON('data/sources.json');
const upstream = `https://github.com/${sources.hust.repository}`;
const content = 'docs/content/docs';
const write = (path, text) => {
  if (path.startsWith(content + '/')) {
    text = text.replace(/\]\(\/Hust-LearningCode\/([^)#]*)(#[^)]*)?\)/g, (_, route, hash = '') => {
      const index = ['group/', 'books/', 'supplement/hust/', 'supplement/csdiy/'].includes(route);
      const target = join(ROOT, content, route.replace(/\/$/, '') || 'index') + (index ? '/index.md' : '.md');
      return `](${encodePath(relative(dirname(join(ROOT, path)), target).split(sep).join('/'))}${hash})`;
    });
  }
  mkdirSync(dirname(join(ROOT, path)), { recursive: true });
  writeFileSync(join(ROOT, path), text);
};
const frontmatter = title => `---\ntitle: ${JSON.stringify(title)}${/^\[(?:Hust-opensource-Xuejie|CSdiy)\]/.test(title) ? '\npagefind: false' : ''}\n---\n\n`;
const table = (head, rows) => `| ${head.join(' | ')} |\n| ${head.map(() => '---').join(' | ')} |\n${rows.map(row => `| ${row.join(' | ')} |`).join('\n')}\n\n`;
const groupCourses = courses.filter(course => materials.some(material => material.course === course.id));
const books = materials.filter(material => material.kind === 'book');
const sorted = list => [...list].sort((a, b) => Number(b.kind === 'book') - Number(a.kind === 'book'));
for (const directory of ['group', 'supplement', 'books']) rmSync(join(ROOT, content, directory), { recursive: true, force: true });

let groupIndex = frontmatter('学码群资料');
groupIndex += `群友分享的教材、讲义、代码和复习题，按实际资料所属主题阅读。\n\n共 **${materials.length} 份资料**，其中 **${books.length} 本书籍**。[直接浏览书籍](${siteLink('books')})。\n\n`;
for (const [category, label] of Object.entries(categories)) {
  const items = groupCourses.filter(course => course.category === category);
  if (!items.length) continue;
  groupIndex += `## ${label}\n\n` + table(['主题', '群内资料'], items.map(course => [`[${mdText(course.title)}](${siteLink(`group/${course.id}`)})`, `${materials.filter(material => material.course === course.id).length} 份`]));
}
const online = readJSON('data/group-intake.json').files.filter(item => item.status === 'linked');
if (online.length) {
  groupIndex += '## 群友分享的在线阅读\n\n';
  for (const url of new Set(online.map(item => item.url))) {
    const shares = online.filter(item => item.url === url);
    groupIndex += `### [${mdText(shares[0].originalName.replace(/\.[^.]+$/, ''))}](${url})\n\n`;
    groupIndex += `群友分享：${[...new Set(shares.map(item => item.contributor))].map(mdText).join('、')}\n\n`;
    groupIndex += `${mdText(shares[0].description)}\n\n`;
  }
}
write(`${content}/group/index.md`, groupIndex);
write(`${content}/index.md`, groupIndex.replace('title: "学码群资料"', 'title: "学码群学习资料"'));
for (const course of groupCourses) {
  const path = `${content}/group/${course.id}.md`;
  const local = sorted(materials.filter(material => material.course === course.id));
  let text = frontmatter(course.title) + `${mdText(course.focus)}。\n\n`;
  text += '## 群友分享\n\n' + local.map(material => materialMarkdown(material, path)).join('');
  text += learningPlan(course);
  text += `[动手工具](${siteLink('guide/tools')}) · [分享资料](${siteLink('guide/contributing')})\n`;
  write(path, text);
}
let bookIndex = frontmatter('群友分享的书籍') + '从教材进入主题，作者、版本与群文件上传者随书展示。\n\n';
for (const course of groupCourses) {
  const local = books.filter(material => material.course === course.id);
  if (!local.length) continue;
  bookIndex += `## [${mdText(course.title)}](${siteLink(`group/${course.id}`)})\n\n`;
  bookIndex += local.map(material => materialMarkdown(material, `${content}/books/index.md`)).join('');
}
if (!books.length) bookIndex += `现有教材书稿见 [C 语言群资料](${siteLink('group/c')})。\n`;
write(`${content}/books/index.md`, bookIndex);

let external = frontmatter('[Hust-opensource-Xuejie] 课程资料补充');
external += `来源：[\\[Hust-opensource-Xuejie\\] 项目主页](${upstream})。由该项目的贡献者整理华科课程讲义、往年试题和实验资料。\n\n`;
for (const [category, label] of Object.entries(categories)) {
  const items = courses.filter(course => !course.localOnly && course.category === category);
  if (!items.length) continue;
  external += `## [Hust-opensource-Xuejie] ${label}\n\n`;
  external += items.map(course => `- [\\[Hust-opensource-Xuejie\\] ${mdText(course.title)}](${siteLink(`supplement/hust/${course.id}`)})`).join('\n') + '\n\n';
}
write(`${content}/supplement/hust/index.md`, external);
for (const course of courses.filter(course => !course.localOnly)) {
  let text = frontmatter(`[Hust-opensource-Xuejie] ${course.title}`);
  text += `来源：[\\[Hust-opensource-Xuejie\\] ${mdText(course.upstreamPath)}](${upstream}/tree/${sources.hust.ref}/${encodePath(course.upstreamPath)})。\n\n`;
  if (course.files.length) text += table(['[Hust-opensource-Xuejie] 资料', '大小'], course.files.map(file => [`[\\[Hust-opensource-Xuejie\\] ${mdText(file.path.slice(course.upstreamPath.length + 1))}](${upstream}/blob/${sources.hust.ref}/${encodePath(file.path)})`, size(file.bytes)]));
  if (course.projects.length) text += '## [Hust-opensource-Xuejie] 实践项目\n\n' + course.projects.map(project => `- [\\[Hust-opensource-Xuejie\\] ${mdText(project.path.slice(course.upstreamPath.length + 1))}](${project.url})`).join('\n') + '\n\n';
  if (course.selfstudy.length) text += '## [CSdiy] 相关自学课程\n\n来源：[\\[CSdiy\\] CS 自学指南](https://csdiy.wiki/)。\n\n' + course.selfstudy.map(path => { const item = studies.find(study => study.path === path); return `- [\\[CSdiy\\] ${mdText(item.title)}](${item.url})`; }).join('\n') + '\n\n';
  write(`${content}/supplement/hust/${course.id}.md`, text);
}
let selfstudy = frontmatter('[CSdiy] 自学课程补充') + '来源：[\\[CSdiy\\] CS 自学指南](https://csdiy.wiki/)，由 CS 自学指南贡献者整理。\n\n';
for (const category of new Set(studies.map(study => study.category))) {
  selfstudy += `## [CSdiy] ${category}\n\n` + studies.filter(study => study.category === category).map(study => `- [\\[CSdiy\\] ${mdText(study.title)}](${study.url})`).join('\n') + '\n\n';
}
write(`${content}/supplement/csdiy/index.md`, selfstudy);

for (const [directory, description] of Object.entries(storageRoots)) {
  const page = `${directory}/README.md`;
  const local = sorted(materials.filter(material => material.path.startsWith(directory + '/')));
  let text = `# ${directory.replace(/^\w+-/, '')}\n\n${description}。\n\n`;
  text += '## 学码群分享\n\n';
  text += local.length ? local.map(material => materialMarkdown(material, page)).join('') : '[浏览学码群现有资料](../docs/content/docs/group/index.md)。\n\n';
  const supplements = courses.filter(course => !course.localOnly && storageRoot(course) === directory);
  if (supplements.length) {
    text += '## [Hust-opensource-Xuejie] 外部补充\n\n来源：[\\[Hust-opensource-Xuejie\\] 项目主页](' + upstream + ')。\n\n';
    text += supplements.map(course => `- [\\[Hust-opensource-Xuejie\\] ${mdText(course.title)}](../docs/content/docs/supplement/hust/${course.id}.md)`).join('\n') + '\n\n';
  }
  text += '[分享资料](../CONTRIBUTING.md)。\n';
  write(page, text);
}
syncPublicMaterials(ROOT, materials);
console.log(`Generated ${materials.length} group materials, ${books.length} books, ${groupCourses.length} group topics.`);
