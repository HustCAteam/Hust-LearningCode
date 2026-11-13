import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { createMarkdownRenderer } from 'vitepress';
import { ROOT, encodePath, mdText, materialMarkdown, syncPublicMaterials } from '../scripts/lib.mjs';
import { materialLinks, materialUrl } from '../docs/.vitepress/material-links.mjs';

const base = '/Hust-LearningCode/';
const material = {
  title: '同步 [修订] `例题`',
  path: '006-操作系统/operating-systems/notes/同步 (修订)#1.md',
  originalName: '原讲义 [修订].md',
  uploadedAt: '2024-11-01',
  contributor: '分享同学',
  author: '讲义作者',
  description: '用时序图解释信号量与进程同步。',
  bytes: 128
};
const page = 'docs/courses/systems/operating-systems.md';
const paths = new Set([material.path]);
const md = await createMarkdownRenderer(join(ROOT, 'docs'), {
  highlight: code => code,
  config: renderer => materialLinks(renderer, [material], base)
}, base);

test('上游文件名作为文字渲染，方括号、反引号、竖线与 Vue 表达式保持原意', () => {
  const title = '讲义 [修订] `code` | <T> & {{ filename }}';
  const html = md.render(`| 资料 |\n| --- |\n| [${mdText(title)}](https://example.com/${encodePath('课程/讲义(1)[修订].pdf')}) |`, { path: resolve(ROOT, page) });
  assert.equal((html.match(/<td>/g) || []).length, 1);
  assert.ok(html.includes('[修订]'));
  assert.ok(html.includes('`code`'));
  assert.ok(!html.includes('<code>'));
  assert.ok(!html.includes('<T>'));
  assert.ok(!html.includes('{{ filename }}'));
  assert.ok(html.includes('%281%29%5B'));
});

test('仓库相对资料链接指向原件，站点链接带 base 且 Markdown 按文件下载', () => {
  const source = materialMarkdown(material, page);
  const href = source.match(/\]\(([^)]+)\)/)[1];
  assert.equal(resolve(dirname(resolve(ROOT, page)), decodeURIComponent(href)), resolve(ROOT, material.path));
  const url = `${base}materials/${encodePath(material.path)}`;
  assert.equal(materialUrl(href, resolve(ROOT, page), paths, base), url);
  assert.equal(materialUrl(`${href}?download=1#part`, resolve(ROOT, page), paths, base), `${url}?download=1#part`);
  assert.equal(materialUrl('../index.md', resolve(ROOT, page), paths, base), null);
  const html = md.render(source, { path: resolve(ROOT, page), cleanUrls: false });
  assert.ok(html.includes(`href="${url}"`));
  assert.ok(html.includes('download=""'));
  assert.ok(!html.includes('.md.html'));
  for (const value of ['原始文件名', '原讲义 [修订].md', material.uploadedAt, '群文件上传者', material.contributor, '作者', material.author, material.description]) assert.ok(html.includes(value), value);
  const groupSource = materialMarkdown(material, 'docs/group/index.md');
  const groupHref = groupSource.match(/\]\(([^)]+)\)/)[1];
  assert.equal(materialUrl(groupHref, resolve(ROOT, 'docs/group/index.md'), paths, base), url);
});

test('重新生成下载副本清理撤下的文件，并保留登记文件的实际字节', () => {
  const root = mkdtempSync(join(tmpdir(), 'learningcode-site-'));
  try {
    const source = join(root, material.path);
    const stale = join(root, 'docs/public/materials/old.pdf');
    mkdirSync(dirname(source), { recursive: true });
    mkdirSync(dirname(stale), { recursive: true });
    writeFileSync(source, '# 学习笔记\n');
    writeFileSync(stale, 'old');
    syncPublicMaterials(root, [material]);
    assert.equal(existsSync(stale), false);
    assert.deepEqual(readFileSync(join(root, 'docs/public/materials', material.path)), readFileSync(source));
    syncPublicMaterials(root, []);
    assert.equal(existsSync(join(root, 'docs/public/materials', material.path)), false);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
