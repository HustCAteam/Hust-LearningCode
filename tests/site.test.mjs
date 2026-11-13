import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { ROOT, BASE, readJSON, encodePath, mdText, materialMarkdown, materialUrl, syncPublicMaterials } from '../scripts/lib.mjs';
import remarkLinks from '../scripts/remark-links.mjs';

const page = 'docs/content/docs/group/cpp.md';
const material = {
  title: '同步 [修订] `例题`',
  path: '006-操作系统/operating-systems/notes/同步 (修订)#1.md',
  originalName: '原讲义 [修订].md',
  uploadedAt: '2024-11-01', contributor: '分享同学', author: '讲义作者',
  description: '用时序图解释信号量与进程同步。', bytes: 128
};
const release = { ...material, storage: 'release', kind: 'book', bytes: 800 * 1024 * 1024, url: 'https://github.com/HustCAteam/Hust-LearningCode/releases/download/group-library/operating-systems__book__text.pdf' };

test('GitHub Markdown 使用原件相对链接并保留贡献者信息', () => {
  const text = materialMarkdown(material, page);
  const href = text.match(/\]\(([^)]+)\)/)[1];
  assert.equal(resolve(dirname(resolve(ROOT, page)), decodeURIComponent(href)), resolve(ROOT, material.path));
  for (const value of [material.contributor, material.author, '群友分享']) assert.ok(text.includes(value));
  assert.ok(mdText('<T> [修订] `code` | {{x}}').includes('&lt;T&gt;'));
});

test('Release 书籍直接链接且不依赖本地大文件', () => {
  assert.equal(materialUrl(release, page), release.url);
  assert.equal(materialUrl(release, '006-操作系统/README.md'), release.url);
  assert.ok(materialMarkdown(release, page).includes('800.00 MiB'));
  const root = mkdtempSync(join(tmpdir(), 'learningcode-release-'));
  try { syncPublicMaterials(root, [release]); assert.ok(!existsSync(join(root, 'docs/public/materials', release.path))); }
  finally { rmSync(root, { recursive: true, force: true }); }
});

test('书籍内容版次仅在标题中显示可读标签', () => {
  const editions = [
    ['6th', '第6版'], ['3rd-vol1', '第3版·第1卷'],
    ['2024-01', '2024年1月'], ['2021', '2021年'],
    ['4th-sample', '第4版·样章'], ['parts1-4', '第1—4部分'],
    ['part5', '第5部分'], ['35-items', '35个条目'],
    ['进阶篇-v0.8', '进阶篇·v0.8'], ['基础篇', '基础篇'],
    ['基础版', '基础版'], ['修订版', '修订版']
  ];
  for (const [version, label] of editions) {
    const book = { ...release, title: '示例书籍', version };
    const [heading, ...body] = materialMarkdown(book, page).split('\n');
    assert.equal(heading, `### 示例书籍 · ${mdText(label)}`);
    assert.ok(!body.join('\n').includes(mdText(label)));
  }
  const text = materialMarkdown({ ...release, title: 'C++ Primer Plus 中文版', version: '6th', author: 'Stephen Prata' }, page);
  assert.equal(text.split('\n')[0], `### ${mdText('C++ Primer Plus 中文版')} · 第6版`);
  assert.ok(text.includes('作者：Stephen Prata'));
});

test('书名中的卷、篇、样章和条目不重复，仍保留缺少的版次', () => {
  const cases = [
    ['计算机程序设计艺术·第 1 卷', '3rd-vol1', '第3版'],
    ['Java 核心技术·卷 I 基础知识', '10th-vol1', '第10版'],
    ['算法（第四版）样章', '4th-sample', ''],
    ['算法·第 1—4 部分', 'parts1-4', ''],
    ['算法·第 5 部分 图算法', 'part5', ''],
    ['More Effective C++：35 个改善编程与设计的方法', '35-items', ''],
    ['Effective C++：55 个具体做法', '3rd', '第3版'],
    ['程序设计竞赛·进阶篇', '进阶篇-v0.8', 'v0.8'],
    ['程序设计竞赛·基础篇', '基础篇', ''],
    ['On Java·基础版', '基础版', ''],
    ['逻辑的挑战（修订版）', '修订版', ''],
    ['示例·第6版', '6th', '']
  ];
  for (const [title, version, remaining] of cases) {
    const heading = materialMarkdown({ ...release, title, version }, page).split('\n')[0];
    assert.equal(heading, `### ${mdText(title)}${remaining ? ` · ${mdText(remaining)}` : ''}`);
  }
});

test('未知版次不使用上传日期替代，图标署名没有空冒号', () => {
  for (const version of [undefined, 'undated', 'unknown-build', '2024-01-02']) {
    const text = materialMarkdown({
      ...release, title: '无明确版次的书', version, contributor: '', contributorNameType: 'icon-only',
      uploadedAt: '2025-03-04', originalName: 'upload-2025.pdf'
    }, page);
    assert.equal(text.split('\n')[0], '### 无明确版次的书');
    assert.ok(!text.includes('2025'));
    assert.ok(!text.includes('unknown'));
    assert.ok(!text.includes('2024'));
    assert.ok(text.includes(' · 群友分享\n'));
    assert.ok(!text.includes('群友分享：'));
  }
});

test('PDF 浏览器阅读、源码文件下载，链接保留完整 query 与 anchor', () => {
  const materials = readJSON('data/materials.json').filter(item => item.storage !== 'release');
  const pdf = materials.find(item => /\.pdf$/i.test(item.path));
  const code = materials.find(item => /\.cpp$/i.test(item.path));
  assert.ok(pdf);
  assert.ok(code);
  const suffix = '?download=1#page=2';
  const links = [materialUrl(pdf, page) + suffix, materialUrl(code, page) + suffix, '../guide/tools.md?view=full#本地-http-请求', '../index.md', release.url].map(url => ({ type: 'link', url, children: [] }));
  remarkLinks()({ type: 'root', children: links }, { path: resolve(ROOT, page) });
  assert.equal(links[0].url, `${BASE}materials/${encodePath(pdf.path)}${suffix}`);
  assert.equal(links[0].data?.hProperties?.download, undefined);
  assert.equal(links[1].url, `${BASE}materials/${encodePath(code.path)}${suffix}`);
  assert.equal(links[1].data.hProperties.download, '');
  assert.equal(links[2].url, `${BASE}guide/tools/?view=full#本地-http-请求`);
  assert.equal(links[3].url, `${BASE}`);
  assert.equal(links[4].url, release.url);
});

test('站点资料副本保持字节、清理旧文件并跳过 Release', () => {
  const root = mkdtempSync(join(tmpdir(), 'learningcode-site-'));
  try {
    const source = join(root, material.path);
    const stale = join(root, 'docs/public/materials/old.pdf');
    mkdirSync(dirname(source), { recursive: true });
    mkdirSync(dirname(stale), { recursive: true });
    writeFileSync(source, '# 学习笔记\n');
    writeFileSync(stale, 'old');
    syncPublicMaterials(root, [material, { ...release, path: 'release/book.pdf' }]);
    assert.equal(existsSync(stale), false);
    assert.deepEqual(readFileSync(join(root, 'docs/public/materials', material.path)), readFileSync(source));
    assert.equal(existsSync(join(root, 'docs/public/materials/release/book.pdf')), false);
  } finally { rmSync(root, { recursive: true, force: true }); }
});
