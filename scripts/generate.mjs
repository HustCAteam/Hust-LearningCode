import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { ROOT, readJSON, catalog, encodePath, mdText, size, storageRoots, storageRoot, courseAliases, materialMarkdown, syncPublicMaterials } from './lib.mjs';

const courses = catalog();
const upstreamCourses = courses.filter(c => !c.localOnly);
const topics = courses.filter(c => c.localOnly);
const studies = readJSON('data/selfstudy.json');
const categories = readJSON('data/categories.json');
const sources = readJSON('data/sources.json');
const materials = readJSON('data/materials.json');
const upstream = `https://github.com/${sources.hust.repository}`;
const generated = '<!-- 此页由 scripts/generate.mjs 生成，内容源位于 data/。 -->\n\n';
const write = (path, text) => { mkdirSync(dirname(join(ROOT, path)), { recursive: true }); writeFileSync(join(ROOT, path), text); };
const resourceLink = file => `${upstream}/blob/${sources.hust.ref}/${encodePath(file.path)}`;
const table = (head, rows) => `| ${head.join(' | ')} |\n| ${head.map(() => '---').join(' | ')} |\n${rows.map(r => `| ${r.join(' | ')} |`).join('\n')}\n`;
let index = `${generated}# 课程与专题目录\n\n按主题找到课程，打开课程页后可以继续查看讲义、实验、复习资料与自学课程。\n\n目录包含 Hust-opensource-Xuejie 的 **${upstreamCourses.length} 个资料目录**，以及学码群整理的 **${topics.length} 个专题**，核对日期为 ${sources.checkedAt}。课程页保留原始目录名称，便于核对专业和学期。选课时请查阅自己的[培养方案](../guide/curriculum.md)。\n\n`;
for (const [cat, label] of Object.entries(categories)) {
  index += `## ${label}\n\n` + table(['课程 / 资料','内容'], courses.filter(c => c.category === cat).map(c => [`[${mdText(c.title)}](${c.category}/${c.id}.md)`,mdText(c.focus)])) + '\n';
}
write('docs/courses/index.md', index);
for (const c of courses) {
  let text = `${generated}# ${mdText(c.title)}\n\n${mdText(c.focus)}。\n\n## 学习起点\n\n- 建议基础：${mdText(c.prerequisites)}。\n- 动手练习：${mdText(c.practice)}\n`;
  if (c.localOnly) {
    text += '\n本专题由学码群整理，资料见下方的群内分享。\n\n';
  } else {
    text += `- 华科资料目录：${mdText(c.upstreamPath)}。\n\n这里的学习建议由学码群整理，可结合本学期的课堂安排选择内容。\n\n## 华科资料\n\n[打开完整课程目录](${upstream}/tree/${sources.hust.ref}/${encodePath(c.upstreamPath)}) · [查看上游最新版本](${upstream}/tree/${sources.hust.branch}/${encodePath(c.upstreamPath)})\n\n`;
  }
  if (c.files.length) text += table(['资料','文件大小'], c.files.map(f => [`[${mdText(f.path.slice(c.upstreamPath.length + 1))}](${resourceLink(f)})`,size(f.bytes)])) + '\n文件标题和大小来自上游目录；打开原文件可查看具体版本与内容。\n\n';
  if (c.projects.length) text += '### 实践项目\n\n' + c.projects.map(p => `- [${mdText(p.path.slice(c.upstreamPath.length + 1))}](${p.url})`).join('\n') + '\n\n';
  if (c.selfstudy.length) text += '## 配套自学课程\n\n' + c.selfstudy.map(p => {const s=studies.find(x=>x.path===p); return `- [${mdText(s.title)}](${s.url})`;}).join('\n') + '\n\n先选择一门课，围绕当前最想弄懂的主题阅读讲义并做练习。具体教材、作业和授课网站可从 CS 自学指南的课程页继续查找。\n\n';
  const local = materials.filter(m=>m.course===c.id);
  text += '## 学码群资料\n\n';
  const page = `docs/courses/${c.category}/${c.id}.md`;
  text += local.length ? local.map(m => materialMarkdown(m, page)).join('') : '欢迎补充与本课程相关的笔记、实验记录和学习资料。\n';
  text += '\n## 一起补充\n\n欢迎分享课堂笔记、实验经验、讲座材料和更清楚的解题思路。请留下你希望展示的名字，以及资料适用的课程和版本；这些信息会随资料一同保留。\n\n[补充资料的方法](../../guide/contributing.md) · [回到课程目录](../index.md)\n';
  write(page,text);
}
let selfstudy = `${generated}# 自学课程与工具\n\n从华科课程页可以找到对应的自学课程。这里还收录了 CS 自学指南的完整导航入口，便于按兴趣继续探索。\n\n来源：[CS 自学指南](https://csdiy.wiki/)，目录核对日期 ${sources.checkedAt}。\n\n`;
for (const group of [...new Set(studies.map(s=>s.category))]) {
 selfstudy += `## ${group}\n\n`+studies.filter(s=>s.category===group).map(s=>`- [${mdText(s.title)}](${s.url})`).join('\n')+'\n\n';
}
write('docs/selfstudy/index.md', selfstudy);
let groups = `${generated}# 学码群资料\n\n群内分享会按课程和主题收录，原始文件名、上传时间、作者与上传者信息一同登记。\n\n当前已归档 **${materials.length} 份**群内资料。\n\n`;
if (!materials.length) groups += '欢迎从课程笔记、实验记录与群内分享开始补充资料。\n\n';
for (const m of materials) {
  const course = courses.find(c => c.id === m.course);
  groups += materialMarkdown(m, 'docs/group/index.md');
  groups += `所属课程 / 专题：[${mdText(course.title)}](../courses/${course.category}/${course.id}.md)\n\n`;
}
const linked = readJSON('data/group-intake.json').files.filter(m => m.status === 'linked');
if (linked.length) {
  groups += '## 群友分享的在线阅读\n\n';
  for (const url of new Set(linked.map(m => m.url))) {
    const shares = linked.filter(m => m.url === url);
    groups += `### [${mdText(shares[0].originalName.replace(/\.[^.]+$/, ''))}](${url})\n\n`;
    groups += shares.map(m => `- ${mdText(m.contributor)} · 群内上传于 ${m.uploadedAt}`).join('\n') + '\n\n';
    groups += `${mdText(shares[0].description)}\n\n`;
  }
}
groups += '[参与补充](../guide/contributing.md) · [贡献与致谢](../guide/credits.md)\n';
write('docs/group/index.md', groups);
for (const [dir, description] of Object.entries(storageRoots)) {
 const associated = courses.filter(c=>storageRoot(c)===dir);
 let text = `${generated}# ${dir.replace(/^\w+-/,'')}\n\n${description}。\n\n`;
 text += table(['课程 / 专题','学习内容'],associated.map(c=>[`[${mdText(c.title)}](../docs/courses/${c.category}/${c.id}.md)`,mdText(c.focus)]))+'\n';
 text += '## 群内资料\n\n';
 const local = materials.filter(m=>m.path.startsWith(dir+'/'));
 text += local.length ? local.map(m => materialMarkdown(m, `${dir}/README.md`)).join('') : '精选文件按“课程 / 资料类型”存放，资料记录见[群资料目录](../docs/group/index.md)。\n';
 text += '\n感谢愿意把笔记、经验和好资料留给后来同学的每一位群友。[补充资料](../CONTRIBUTING.md)时可以留下希望展示的署名。\n';
 write(`${dir}/README.md`,text);
}
const stats={courses:upstreamCourses.length,topics:topics.length,resources:upstreamCourses.reduce((n,c)=>n+c.files.length,0),selfstudy:studies.length,materials:materials.length,checkedAt:sources.checkedAt};
write('docs/.vitepress/stats.json',JSON.stringify(stats,null,2)+'\n');
write('docs/.vitepress/catalog.json', JSON.stringify(courses.map(({id,title,category,focus,upstreamPath,localOnly}) => ({id,title,category,focus,upstreamPath,localOnly:!!localOnly,aliases:courseAliases[id] || [],categoryTitle:categories[category]})), null, 2)+'\n');
// The public copy is disposable; Markdown links keep pointing to the repository originals.
syncPublicMaterials(ROOT, materials);
console.log(`Generated ${upstreamCourses.length} course pages, ${topics.length} topics, ${stats.resources} file links, ${studies.length} self-study entries, ${materials.length} group files.`);
