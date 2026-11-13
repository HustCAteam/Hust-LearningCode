import { createHash } from 'node:crypto';
import { lstatSync, realpathSync } from 'node:fs';
import { resolve, sep, extname } from 'node:path';
import { storageRoot, LIMITS } from './lib.mjs';
export const kinds = new Set(['notes', 'slides', 'lab', 'exercise', 'guide', 'talk', 'source']);
export const extensions = new Set(['.pdf','.doc','.docx','.ppt','.pptx','.txt','.md','.c','.cpp','.h','.hpp','.s','.py','.java','.rs','.ml','.sml','.v','.sv']);
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
  if (!extensions.has(originalExtension)) throw Error('请先展开资料，并选择文档或源代码文件');
  if (meta.archiveExtension && (meta.archiveExtension !== '.pdf' || !['.doc','.docx','.ppt','.pptx'].includes(originalExtension))) throw Error('Office 阅读副本使用 PDF 格式');
  const ext = meta.archiveExtension || originalExtension;
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
  for (const key of ['title','originalName','course','kind','topic','version','contributor','sourceFolder','uploadedAt','description']) {
    if (typeof meta[key] !== 'string' || !meta[key].trim()) throw Error(`请补全 ${key}`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(meta.uploadedAt) || new Date(meta.uploadedAt).toISOString().slice(0,10)!==meta.uploadedAt) throw Error('上传日期使用 YYYY-MM-DD');
  if (meta.sourceFolder === '/' && meta.uploadedAt < '2019-01-01' && !meta.historicalValue?.trim()) throw Error('请补充早期资料的具体学习用途');
  return materialPath(meta, courses);
}
export function validateBytes(bytes, total = 0) {
  if (!bytes.length || bytes.length > LIMITS.file) throw Error('资料大小需为 1 B 至 10 MiB');
  if (bytes.length + total > LIMITS.total) throw Error('资料总容量需控制在 80 MiB 内');
  const magic=bytes.subarray(0,4).toString('hex');
  if (magic.startsWith('4d5a') || magic === '7f454c46') throw Error('请选择文档或源代码文件');
}
