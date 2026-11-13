import { readFileSync, readdirSync, existsSync, mkdirSync, rmSync, copyFileSync } from 'node:fs';
import { dirname, resolve, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const readJSON = path => JSON.parse(readFileSync(join(ROOT, path), 'utf8'));
// Encode Markdown URL delimiters as well as spaces and non-ASCII characters.
export const encodePath = path => path.split('/').map(part => encodeURIComponent(part).replace(/[!'()*]/g, c => `%${c.charCodeAt(0).toString(16).toUpperCase()}`)).join('/');
export const mdText = value => String(value)
  .replace(/&/g, '&amp;')
  .replace(/[\\`*_[\]()#+.!|~-]/g, '\\$&')
  .replace(/[<>{}]/g, c => ({ '<': '&lt;', '>': '&gt;', '{': '&#123;', '}': '&#125;' })[c])
  .replace(/[\r\n]+/g, ' ');
export function catalog() {
  return [...readJSON('data/courses.json'), ...(existsSync(join(ROOT, 'data/topics.json')) ? readJSON('data/topics.json') : [])];
}
export const BASE = '/Hust-LearningCode/';
export const siteLink = slug => `${BASE}${slug.replace(/^\/|\/$/g, '')}/`;
export function materialUrl(material, page) {
  if (material.storage === 'release') return material.url;
  return encodePath(relative(dirname(join(ROOT, page)), join(ROOT, material.path)).split(sep).join('/'));
}
export function bookEdition(material) {
  if (material.kind !== 'book' || !material.version || material.version === 'undated') return '';
  const title = material.title.replace(/\s+/g, '');
  const chineseNumber = value => {
    const digits = '零一二三四五六七八九';
    const number = Number(value);
    return number < 10 ? digits[number] : number < 100
      ? `${number >= 20 ? digits[Math.floor(number / 10)] : ''}十${number % 10 ? digits[number % 10] : ''}`
      : value;
  };
  const labels = [];
  const add = (label, aliases = [label]) => {
    if (!aliases.some(alias => title.includes(alias))) labels.push(label);
  };
  let match;
  if ((match = material.version.match(/^(\d+)(?:st|nd|rd|th)(?:-vol(\d+)|-(sample))?$/))) {
    const [, edition, volume, sample] = match;
    add(`第${edition}版`, [`第${edition}版`, `第${chineseNumber(edition)}版`]);
    if (volume) add(`第${volume}卷`, [`第${volume}卷`, `第${chineseNumber(volume)}卷`, ...(volume === '1' ? ['卷I', '卷Ⅰ'] : [])]);
    if (sample) add('样章');
  } else if ((match = material.version.match(/^(\d{4})(?:-(0[1-9]|1[0-2]))?$/))) {
    add(match[2] ? `${match[1]}年${Number(match[2])}月` : `${match[1]}年`);
  } else if ((match = material.version.match(/^parts(\d+)-(\d+)$/))) {
    add(`第${match[1]}—${match[2]}部分`);
  } else if ((match = material.version.match(/^part(\d+)$/))) {
    add(`第${match[1]}部分`);
  } else if ((match = material.version.match(/^(\d+)-items$/))) {
    if (!title.includes(match[1])) add(`${match[1]}个条目`);
  } else if ((match = material.version.match(/^(进阶篇|基础篇|基础版|修订版)(?:-(v\d+(?:\.\d+)*))?$/))) {
    add(match[1]);
    if (match[2]) add(match[2]);
  }
  return labels.join('·');
}
export function materialMarkdown(material, page) {
  const format = material.path.split('.').pop().toUpperCase();
  const edition = bookEdition(material);
  let text = `### ${mdText(material.title)}${edition ? ` · ${mdText(edition)}` : ''}\n\n${mdText(material.description)}\n\n`;
  const details = [`[${format} · ${size(material.bytes)} · 打开下载](${materialUrl(material, page)})`];
  if (material.author) details.push(`作者：${mdText(material.author)}`);
  details.push(material.contributor ? `群友分享：${mdText(material.contributor)}` : '群友分享');
  if (material.contributors?.length) details.push(`整理：${material.contributors.map(mdText).join('、')}`);
  text += details.join(' · ') + '\n\n';
  if (material.readingGuide) {
    const href = encodePath(relative(dirname(join(ROOT, page)), join(ROOT, material.readingGuide)).split(sep).join('/'));
    text += `[配套阅读](${href})\n\n`;
  }
  return text;
}
export function syncPublicMaterials(root, materials) {
  const destination = resolve(root, 'docs/public/materials');
  rmSync(destination, { recursive: true, force: true });
  for (const material of materials.filter(item => item.storage !== 'release')) {
    const source = resolve(root, material.path);
    const target = resolve(destination, material.path);
    if (!source.startsWith(resolve(root) + sep) || !target.startsWith(destination + sep)) throw Error(`资料路径越界：${material.path}`);
    mkdirSync(dirname(target), { recursive: true });
    copyFileSync(source, target);
  }
}
export const size = bytes => bytes >= 1024 ** 3 ? `${(bytes / 1024 ** 3).toFixed(2)} GiB` : bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(1)} KiB` : `${(bytes / 1024 / 1024).toFixed(2)} MiB`;
export const LIMITS = { file: 10 * 1024 * 1024, total: 80 * 1024 * 1024 };
export const ignored = new Set(['.git', '.agents', '.aws', '.codex', 'node_modules', 'inbox', 'archive', '.local', 'dist', '.astro', 'HANDOFF.md', '__pycache__']);
export function files(dir = ROOT) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    if (ignored.has(entry.name)) return [];
    const path = join(dir, entry.name);
    if (relative(ROOT, path).split(sep).join('/') === 'docs/public/materials') return [];
    if (entry.isSymbolicLink()) throw new Error(`请使用实际文件：${path}`);
    return entry.isDirectory() ? files(path) : [path];
  });
}
export const storageRoots = {
  '000-计算机基础': '工具、系统入门与计算思维',
  '001-计算机语言': 'C、C++、Java、Python、函数式编程与其他语言',
  '002-算法和数据结构': '数据结构、算法设计与程序设计实践',
  '003-计算机数学': '微积分、线性代数、离散数学、概率与数值计算',
  '004-数据库': '关系数据库、SQL、索引与事务',
  '005-计算机网络': '网络原理、协议与网络编程',
  '006-操作系统': '进程、内存、文件系统与内核实验',
  '007-软件工程': '软件构造、测试、开发流程与项目实践',
  '008-编译原理': '编译器、语言实现与程序分析',
  '009-嵌入式与单片机': '嵌入式开发、单片机与外设实践',
  '010-计算机组成与硬件': '数字逻辑、电路、体系结构与硬件设计',
  '011-人工智能与数据科学': '机器学习、自然语言处理与数据分析',
  '012-图形学与图像处理': '图形学、计算机视觉与图像处理',
  '013-并行与分布式系统': '并行计算与分布式系统实践',
  '014-课程与校园资料': '通识课程、培养方案与升学经验',
  'A-计算机协会': '学码群分享、社团活动与竞赛交流'
};
export function storageRoot(course) {
  if (course.storageDirectory) return course.storageDirectory;
  const special = {
    'data-structures': '002-算法和数据结构', algorithms: '002-算法和数据结构', 'programming-project': '002-算法和数据结构',
    databases: '004-数据库', networks: '005-计算机网络', 'operating-systems': '006-操作系统', compilers: '008-编译原理',
    'embedded-1': '009-嵌入式与单片机', 'embedded-2': '009-嵌入式与单片机',
    graphics: '012-图形学与图像处理', 'computer-vision': '012-图形学与图像处理', 'image-processing': '012-图形学与图像处理',
    'parallel-computing': '013-并行与分布式系统', 'big-data-systems-project': '013-并行与分布式系统',
    assembly: '010-计算机组成与硬件',
    competitions: 'A-计算机协会', 'hardware-project': '010-计算机组成与硬件'
  };
  return special[course.id] || {
    programming: '001-计算机语言', math: '003-计算机数学', hardware: '010-计算机组成与硬件',
    systems: '000-计算机基础', data: '011-人工智能与数据科学', practice: '007-软件工程',
    general: '014-课程与校园资料', campus: '014-课程与校园资料', advanced: '003-计算机数学'
  }[course.category];
}
