import { createHash } from 'node:crypto';
import { lstatSync, realpathSync } from 'node:fs';
import { resolve, sep, extname } from 'node:path';
import { storageRoot, LIMITS } from './lib.mjs';
export const kinds = new Set(['book', 'notes', 'slides', 'lab', 'exercise', 'guide', 'talk', 'source']);
export const extensions = new Set(['.pdf','.epub','.doc','.docx','.ppt','.pptx','.txt','.md','.c','.cpp','.h','.hpp','.s','.py','.java','.rs','.ml','.sml','.v','.sv']);
const sourceExtensions = new Set(['.c','.cpp','.h','.hpp','.s','.py','.java','.rs','.ml','.sml','.v','.sv']);
const projectExtensions = new Set([...extensions, '.png','.jpg','.jpeg','.gif','.bmp','.ico']);
const archiveExtensions = new Set(['.zip', '.rar', '.7z']);
function safeArchiveMember(value) {
  return typeof value === 'string' && value.length > 0 && !/[\\:\x00-\x1f]/.test(value) && !value.split('/').some(part => !part || part === '.' || part === '..');
}
function memberInventory(value) {
  return Array.isArray(value) && value.length > 0 && value.every(safeArchiveMember) && new Set(value).size === value.length;
}
export const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
export function safePart(value) {
  if (typeof value !== 'string' || !value.trim() || /[\\/<>:"|?*\x00-\x1f]/.test(value) || value.includes('..') || value.includes('__')) throw Error('名称字段需要简短标题，并使用普通文字');
  return value.trim().normalize('NFC').replace(/\s+/g, '-');
}
export function materialPath(meta, courses) {
  const course = courses.find(c => c.id === meta.course);
  if (!course) throw Error('请填写已有课程标识');
  if (!kinds.has(meta.kind)) throw Error('请填写资料类型');
  const originalExtension = extname(meta.originalName).toLowerCase();
  const container = archiveExtensions.has(originalExtension);
  if (container) {
    if (!/^[a-f0-9]{64}$/.test(meta.originalSha256)) throw Error('压缩包资料需要原件 SHA-256');
    if (meta.archiveExtension === '.zip') {
      if (meta.kind !== 'source' || meta.archiveMember !== undefined || !memberInventory(meta.archiveMembers) || !meta.archiveMembers.every(member => projectExtensions.has(extname(member).toLowerCase())) || !meta.archiveMembers.some(member => sourceExtensions.has(extname(member).toLowerCase()))) throw Error('源码项目 ZIP 需要完整的安全源码与资源成员清单');
    } else if (!extensions.has(meta.archiveExtension) || !safeArchiveMember(meta.archiveMember) || extname(meta.archiveMember).toLowerCase() !== meta.archiveExtension || meta.archiveMembers !== undefined) {
      throw Error('压缩包资料需要明确的文档或源码成员及其扩展名');
    }
    if (meta.sourceArchiveMembers !== undefined && !memberInventory(meta.sourceArchiveMembers)) throw Error('原压缩包成员清单需要安全相对路径');
  } else {
    if (!extensions.has(originalExtension)) throw Error('请先展开资料，并选择文档或源代码文件');
    if (meta.archiveExtension && (meta.archiveExtension !== '.pdf' || !['.doc','.docx','.ppt','.pptx'].includes(originalExtension))) throw Error('阅读副本使用 PDF 格式');
  }
  const ext = meta.archiveExtension || originalExtension;
  if (ext === '.epub' && meta.kind !== 'book') throw Error('EPUB 使用 book 类型');
  return `${storageRoot(course)}/${course.id}/${meta.kind}/${course.id}__${meta.kind}__${safePart(meta.topic)}__${safePart(meta.version)}${ext}`;
}
export function containedPath(root, path) {
  const base = realpathSync(root);
  const target = resolve(base, path);
  if (!target.startsWith(base + sep)) throw Error('文件路径需要位于指定目录内');
  let cursor = base;
  for (const part of target.slice(base.length + 1).split(sep)) {
    cursor += sep + part;
    try { if (lstatSync(cursor).isSymbolicLink()) throw Error('请使用实际文件路径'); }
    catch (e) { if (e.code !== 'ENOENT') throw e; }
  }
  return target;
}
export function validateMeta(meta, courses) {
  for (const key of ['title','originalName','course','kind','topic','version','sourceFolder','uploadedAt','description']) {
    if (typeof meta[key] !== 'string' || !meta[key].trim()) throw Error(`请补全 ${key}`);
  }
  if (typeof meta.contributor !== 'string' || !meta.contributor.trim() && !(meta.contributor === '' && meta.contributorNameType === 'icon-only')) throw Error('请补全 contributor');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(meta.uploadedAt) || new Date(meta.uploadedAt).toISOString().slice(0,10)!==meta.uploadedAt) throw Error('上传日期使用 YYYY-MM-DD');
  if (meta.storage && !['git', 'release'].includes(meta.storage)) throw Error('storage 使用 git 或 release');
  return materialPath(meta, courses);
}
export function validateRelease(meta) {
  if (!Number.isSafeInteger(meta.bytes) || meta.bytes <= 0 || !/^[a-f0-9]{64}$/.test(meta.sha256)) throw Error('Release 资料需要真实容量和 SHA-256');
  const url = new URL(meta.url);
  const prefix = `/HustCAteam/Hust-LearningCode/releases/download/${meta.releaseTag}/`;
  if (url.protocol !== 'https:' || url.hostname !== 'github.com' || url.username || url.password || url.search || url.hash || meta.releaseTag !== 'group-library' || !url.pathname.startsWith(prefix) || !url.pathname.slice(prefix.length) || url.pathname.slice(prefix.length).includes('/')) throw Error('请填写 group-library 的直接 Release 资源链接');
}
export function validateBytes(bytes, total = 0) {
  if (!bytes.length || bytes.length > LIMITS.file) throw Error('资料大小需为 1 B 至 10 MiB');
  if (bytes.length + total > LIMITS.total) throw Error('资料总容量需控制在 80 MiB 内');
  const magic=bytes.subarray(0,4).toString('hex');
  if (magic.startsWith('4d5a') || magic === '7f454c46') throw Error('请选择文档或源代码文件');
}
